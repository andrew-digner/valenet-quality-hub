import {
  Body,
  Controller,
  Get,
  Inject,
  Ip,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../auth/decorators/auth.decorators.js';
import { CurrentUser } from '../auth/decorators/auth.decorators.js';

import { AuditService } from './audit.service.js';

import type { AuditExportDto } from './audit.dto.js';
import type { AuditContext } from './audit.service.js';
import type { AuthenticatedUser } from '../auth/interfaces/auth.types.js';
import type { AuditOperation } from '@prisma/client';
import type { FastifyReply, FastifyRequest } from 'fastify';

const contextOf = (
  request: FastifyRequest,
  ipAddress: string,
  user: AuthenticatedUser,
): AuditContext => ({
  actorId: user.id,
  actorName: user.email,
  actorRoles: user.roles,
  correlationId: String(request.headers['x-correlation-id'] ?? request.id),
  requestId: request.id,
  ipAddress,
  ...(request.headers['user-agent'] ? { userAgent: request.headers['user-agent'] } : {}),
});

@ApiTags('audit')
@ApiBearerAuth()
@Controller({ path: 'audit', version: '1' })
export class AuditController {
  constructor(@Inject(AuditService) private readonly service: AuditService) {}

  @Get()
  @Permissions('AUDIT.LOG.READ')
  list(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '20',
    @Query('module') module?: string,
    @Query('operation') operation?: AuditOperation,
    @Query('actorId') actorId?: string,
    @Query('correlationId') correlationId?: string,
    @Req() request?: FastifyRequest,
    @Ip() ip?: string,
    @CurrentUser() user?: AuthenticatedUser,
  ) {
    return this.service.list(
      {
        page: Math.max(1, Number(page)),
        pageSize: Math.min(100, Math.max(1, Number(pageSize))),
        ...(module ? { module } : {}),
        ...(operation ? { operation } : {}),
        ...(actorId ? { actorId } : {}),
        ...(correlationId ? { correlationId } : {}),
      },
      request && ip && user ? contextOf(request, ip, user) : undefined,
    );
  }

  @Get(':id')
  @Permissions('AUDIT.LOG.READ')
  async findOne(
    @Param('id') id: string,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const record = await this.service.findOne(id, contextOf(request, ip, user));
    if (!record) throw new NotFoundException();
    return record;
  }

  @Post('exports')
  @Permissions('AUDIT.LOG.EXPORT')
  async export(
    @Body() dto: AuditExportDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    const file = await this.service.export(dto.format, contextOf(request, ip, user));
    void reply
      .header('content-type', file.contentType)
      .header('content-disposition', `attachment; filename="${file.filename}"`)
      .send(file.buffer);
  }
}
