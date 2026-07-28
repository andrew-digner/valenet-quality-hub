import {
  Catch,
  HttpException,
  HttpStatus,
  type ExceptionFilter,
  type LoggerService,
} from '@nestjs/common';

import { CORRELATION_ID_HEADER } from '../http/http.constants.js';

import type { ApiErrorDetail, ApiErrorResponse } from '../http/api-response.types.js';
import type { ArgumentsHost } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

interface HttpExceptionBody {
  message?: string | string[];
}

const isHttpExceptionBody = (value: unknown): value is HttpExceptionBody =>
  typeof value === 'object' && value !== null;

const getErrorDetails = (response: unknown): ApiErrorDetail[] => {
  if (!isHttpExceptionBody(response) || !Array.isArray(response.message)) {
    return [];
  }

  return response.message.map((message) => ({ message }));
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<FastifyRequest>();
    const reply = http.getResponse<FastifyReply>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = isHttpException ? exception.getResponse() : undefined;
    const isValidationError =
      status === HttpStatus.BAD_REQUEST &&
      isHttpExceptionBody(response) &&
      Array.isArray(response.message);
    const errorCode = isValidationError
      ? 'VALIDATION_ERROR'
      : status === HttpStatus.UNAUTHORIZED
        ? 'UNAUTHORIZED'
        : status === HttpStatus.FORBIDDEN
          ? 'FORBIDDEN'
          : status === HttpStatus.NOT_FOUND
            ? 'RESOURCE_NOT_FOUND'
            : status >= HttpStatus.INTERNAL_SERVER_ERROR
              ? 'INTERNAL_SERVER_ERROR'
              : 'REQUEST_ERROR';
    const safeMessage = isValidationError
      ? 'Não foi possível validar os dados informados.'
      : status === HttpStatus.UNAUTHORIZED
        ? 'Autenticação necessária.'
        : status === HttpStatus.FORBIDDEN
          ? 'Acesso não autorizado.'
          : status === HttpStatus.NOT_FOUND
            ? 'Recurso não encontrado.'
            : status >= HttpStatus.INTERNAL_SERVER_ERROR
              ? 'Ocorreu um erro interno.'
              : 'Não foi possível processar a requisição.';
    const responseStatus = isValidationError ? HttpStatus.UNPROCESSABLE_ENTITY : status;
    const body: ApiErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message: safeMessage,
        details: getErrorDetails(response),
      },
      meta: { correlationId: request.id },
    };

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Unhandled request error correlationId=${request.id}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(`Request rejected status=${responseStatus} correlationId=${request.id}`);
    }

    void reply.header(CORRELATION_ID_HEADER, request.id).status(responseStatus).send(body);
  }
}
