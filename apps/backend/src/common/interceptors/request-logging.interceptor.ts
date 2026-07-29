import { Inject, Injectable, type LoggerService, type NestInterceptor } from '@nestjs/common';
import { finalize, type Observable } from 'rxjs';

import { MetricsService } from '../metrics/metrics.service.js';

import type { CallHandler, ExecutionContext } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService,
    @Inject(MetricsService) private readonly metricsService: MetricsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = performance.now();
    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();

    return next.handle().pipe(
      finalize(() => {
        const durationMs = Math.round(performance.now() - startedAt);
        this.metricsService.observe(
          request.method,
          request.url.split('?')[0] ?? request.url,
          reply.statusCode,
          durationMs,
        );
        this.logger.log(
          JSON.stringify({
            correlationId: request.headers['x-correlation-id'] ?? request.id,
            durationMs,
            method: request.method,
            requestId: request.id,
            statusCode: reply.statusCode,
            url: request.url,
          }),
        );
      }),
    );
  }
}
