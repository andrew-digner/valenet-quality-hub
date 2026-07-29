import { Controller, Get, Header, Inject, VERSION_NEUTRAL } from '@nestjs/common';

import { Public } from '../../modules/auth/decorators/auth.decorators.js';

import { MetricsService } from './metrics.service.js';

@Public()
@Controller({ path: 'metrics', version: VERSION_NEUTRAL })
export class MetricsController {
  constructor(@Inject(MetricsService) private readonly metricsService: MetricsService) {}

  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  getMetrics(): Promise<string> {
    return this.metricsService.render();
  }
}
