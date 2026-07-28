import { Injectable, type LoggerService, type NestInterceptor } from '@nestjs/common';
import { finalize, type Observable } from 'rxjs';

import type { CallHandler, ExecutionContext } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = performance.now();
    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();

    return next.handle().pipe(
      finalize(() => {
        const durationMs = Math.round(performance.now() - startedAt);
        this.logger.log(
          `${request.method} ${request.url} ${reply.statusCode} ${durationMs}ms correlationId=${request.id}`,
        );
      }),
    );
  }
}
