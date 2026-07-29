import { randomUUID } from 'node:crypto';

import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { ValidationPipe, VersioningType, type INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '../../app.module.js';
import { GlobalExceptionFilter } from '../../common/filters/global-exception.filter.js';
import { CorrelationIdInterceptor } from '../../common/interceptors/correlation-id.interceptor.js';
import { RequestLoggingInterceptor } from '../../common/interceptors/request-logging.interceptor.js';
import { StructuredLogger } from '../../common/logging/structured-logger.service.js';
import { MetricsService } from '../../common/metrics/metrics.service.js';

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
    genReqId: () => randomUUID(),
    logger: false,
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
  const logger = app.get(StructuredLogger);
  app.useLogger(logger);

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

  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.useGlobalInterceptors(
    new CorrelationIdInterceptor(),
    new RequestLoggingInterceptor(logger, app.get(MetricsService)),
  );
  configureOpenApi(app);

  return app;
};
