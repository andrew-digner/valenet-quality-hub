import { ConfigService } from '@nestjs/config';

import { HealthService } from './health.service.js';

import type { PrismaService } from '../../database/prisma.service.js';

describe('HealthService', () => {
  it('reports the API and database status', async () => {
    const configService = new ConfigService({
      NODE_ENV: 'test',
      npm_package_version: '0.1.0',
    });
    const prismaService = {
      isHealthy: jest.fn().mockResolvedValue(true),
    } as unknown as PrismaService;
    const service = new HealthService(configService, prismaService);

    await expect(service.getHealth()).resolves.toEqual({
      status: 'ok',
      database: 'connected',
      environment: 'test',
      version: '0.1.0',
    });
    expect(prismaService.isHealthy).toHaveBeenCalledTimes(1);
  });
});
