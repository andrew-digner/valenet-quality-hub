import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../../database/prisma.service.js';

export interface HealthStatus {
  status: 'ok';
  database: 'connected';
  environment: string;
  version: string;
}

@Injectable()
export class HealthService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) {}

  async getHealth(): Promise<HealthStatus> {
    await this.prismaService.isHealthy();
    return {
      status: 'ok',
      database: 'connected',
      environment: this.configService.get('NODE_ENV', 'development'),
      version: this.configService.get('npm_package_version', '0.1.0'),
    };
  }
}
