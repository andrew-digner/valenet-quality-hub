import { Module } from '@nestjs/common';

import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';
import { RedisHealthService } from './redis-health.service.js';

@Module({
  controllers: [HealthController],
  providers: [HealthService, RedisHealthService],
})
export class HealthModule {}
