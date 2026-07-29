import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createApplication } from './shared/application/create-application.js';

const bootstrap = async (): Promise<void> => {
  const app = await createApplication();
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('app.port');

  await app.listen(port, '0.0.0.0');
  Logger.log(`Backend disponível na porta ${port}.`, 'Bootstrap');
};

void bootstrap();
