import { Injectable, type NestInterceptor } from '@nestjs/common';
import { map, type Observable } from 'rxjs';

import { CORRELATION_ID_HEADER } from '../http/http.constants.js';

import type { ApiSuccessResponse } from '../http/api-response.types.js';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiSuccessResponse<unknown>> {
    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();
    const correlationId = request.id;

    void reply.header(CORRELATION_ID_HEADER, correlationId);

    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        data,
        meta: { correlationId },
      })),
    );
  }
}
