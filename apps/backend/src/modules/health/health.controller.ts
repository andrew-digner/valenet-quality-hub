import { Controller, Get, Inject, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/decorators/auth.decorators.js';

import { HealthService, type HealthStatus } from './health.service.js';

@ApiTags('health')
@Public()
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(@Inject(HealthService) private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Consulta a saúde da API' })
  @ApiOkResponse({ description: 'API disponível.' })
  async getHealth(): Promise<HealthStatus> {
    return this.healthService.getHealth();
  }
}
