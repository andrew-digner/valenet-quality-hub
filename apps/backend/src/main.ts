import { Logger } from '@nestjs/common';

import { createApplication } from './shared/application/create-application.js';

const bootstrap = async (): Promise<void> => {
  const app = await createApplication();
  const port = Number(process.env.BACKEND_PORT ?? 3001);

  await app.listen(port, '0.0.0.0');
  Logger.log(`Backend disponível na porta ${port}.`, 'Bootstrap');
};

void bootstrap();
