import { ConfigService } from '@nestjs/config';

import { HealthService } from './health.service.js';

import type { RedisHealthService } from './redis-health.service.js';
import type { PrismaService } from '../../database/prisma.service.js';

describe('HealthService', () => {
  it('reports the API and database status', async () => {
    const configService = new ConfigService({
      app: {
        environment: 'test',
        version: '0.1.0',
      },
    });
    const prismaService = {
      isHealthy: jest.fn().mockResolvedValue(true),
    } as unknown as PrismaService;
    const redisHealthService = {
      isHealthy: jest.fn().mockResolvedValue(true),
    } as unknown as RedisHealthService;
    const service = new HealthService(configService, prismaService, redisHealthService);

    await expect(service.getHealth()).resolves.toEqual({
      status: 'ok',
      database: 'connected',
      environment: 'test',
      redis: 'connected',
      version: '0.1.0',
      worker: 'not_configured',
    });
    expect(prismaService.isHealthy).toHaveBeenCalledTimes(1);
    expect(redisHealthService.isHealthy).toHaveBeenCalledTimes(1);
  });
});
