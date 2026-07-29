import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../../database/prisma.service.js';

import { RedisHealthService } from './redis-health.service.js';

export interface HealthStatus {
  status: 'ok';
  database: 'connected';
  redis: 'connected';
  worker: 'not_configured';
  environment: string;
  version: string;
}

@Injectable()
export class HealthService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(RedisHealthService) private readonly redisHealthService: RedisHealthService,
  ) {}

  async getHealth(): Promise<HealthStatus> {
    await this.prismaService.isHealthy();
    await this.redisHealthService.isHealthy();
    return {
      status: 'ok',
      database: 'connected',
      environment: this.configService.getOrThrow<string>('app.environment'),
      redis: 'connected',
      version: this.configService.getOrThrow<string>('app.version'),
      worker: 'not_configured',
    };
  }
}
