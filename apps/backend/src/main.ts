import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.BACKEND_PORT ?? 3001);

  app.enableShutdownHooks();
  app.enableVersioning({
    defaultVersion: '1',
    prefix: 'api/v',
    type: VersioningType.URI,
  });

  await app.listen(port);
  Logger.log(`Backend disponível na porta ${port}.`, 'Bootstrap');
};

void bootstrap();
