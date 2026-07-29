import { Injectable, type NestInterceptor } from '@nestjs/common';
import { map, type Observable } from 'rxjs';

import { CORRELATION_ID_HEADER, REQUEST_ID_HEADER } from '../http/http.constants.js';

import type { ApiSuccessResponse } from '../http/api-response.types.js';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiSuccessResponse<unknown>> {
    const http = context.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();
    const incomingCorrelationId = request.headers[CORRELATION_ID_HEADER];
    const correlationId =
      typeof incomingCorrelationId === 'string' && incomingCorrelationId.length > 0
        ? incomingCorrelationId
        : request.id;

    void reply.header(CORRELATION_ID_HEADER, correlationId);
    void reply.header(REQUEST_ID_HEADER, request.id);

    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        data,
        meta: { correlationId },
      })),
    );
  }
}
