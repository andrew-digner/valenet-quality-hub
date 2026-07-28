import { randomUUID } from 'node:crypto';

import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { Logger, ValidationPipe, VersioningType, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '../../app.module.js';
import { GlobalExceptionFilter } from '../../common/filters/global-exception.filter.js';
import { CORRELATION_ID_HEADER } from '../../common/http/http.constants.js';
import { CorrelationIdInterceptor } from '../../common/interceptors/correlation-id.interceptor.js';
import { RequestLoggingInterceptor } from '../../common/interceptors/request-logging.interceptor.js';

import type { IncomingMessage } from 'node:http';

const configureOpenApi = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Valenet Quality Hub API')
    .setDescription('API corporativa de gestão da qualidade.')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
};

export const createApplication = async (): Promise<NestFastifyApplication> => {
  const adapter = new FastifyAdapter({
    genReqId: (request: IncomingMessage) => {
      const correlationId = request.headers[CORRELATION_ID_HEADER];
      return typeof correlationId === 'string' && correlationId.length > 0
        ? correlationId
        : randomUUID();
    },
    logger: false,
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  await app.register(helmet);
  await app.register(compression);
  app.enableCors();
  app.enableShutdownHooks();
  app.enableVersioning({
    defaultVersion: '1',
    prefix: 'api/v',
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  const logger = new Logger('HTTP');
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.useGlobalInterceptors(new CorrelationIdInterceptor(), new RequestLoggingInterceptor(logger));
  configureOpenApi(app);

  return app;
};
