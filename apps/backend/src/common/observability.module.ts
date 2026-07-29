import { Global, Module } from '@nestjs/common';

import { StructuredLogger } from './logging/structured-logger.service.js';
import { MetricsController } from './metrics/metrics.controller.js';
import { MetricsService } from './metrics/metrics.service.js';

@Global()
@Module({
  controllers: [MetricsController],
  exports: [MetricsService, StructuredLogger],
  providers: [MetricsService, StructuredLogger],
})
export class ObservabilityModule {}
