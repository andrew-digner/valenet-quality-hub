import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Ip,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';

import { CurrentUser, Permissions } from '../../auth/decorators/auth.decorators.js';
import { AdministrationService } from '../services/administration.service.js';

import type { AuditContext } from '../../audit/audit.service.js';
import type { AuthenticatedUser } from '../../auth/interfaces/auth.types.js';
import type {
  CreateOrganizationDto,
  CreatePermissionDto,
  CreateRoleDto,
  CreateUserDto,
  PageQueryDto,
  RolePermissionsDto,
  StatusQueryDto,
  UpdateOrganizationDto,
  UpdatePermissionDto,
  UpdateRoleDto,
  UpdateUserDto,
  UserStatusDto,
} from '../dto/administration.dto.js';
import type { FastifyRequest } from 'fastify';

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

@ApiTags('users')
@ApiBearerAuth()
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(@Inject(AdministrationService) private readonly service: AdministrationService) {}

  @Get()
  @Permissions('USERS.USER.READ')
  list(
    @Query() query: PageQueryDto,
    @Query('status') status?: UserStatus,
    @Query('roleId') roleId?: string,
    @Query('areaId') areaId?: string,
    @Query('teamId') teamId?: string,
  ) {
    return this.service.listUsers({
      ...query,
      ...(status ? { status } : {}),
      ...(roleId ? { roleId } : {}),
      ...(areaId ? { areaId } : {}),
      ...(teamId ? { teamId } : {}),
    });
  }

  @Get(':id')
  @Permissions('USERS.USER.READ')
  findOne(@Param('id') id: string) {
    return this.service.getUser(id);
  }

  @Post()
  @Permissions('USERS.USER.CREATE')
  create(
    @Body() dto: CreateUserDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createUser(dto, contextOf(request, ip, user));
  }

  @Put(':id')
  @Permissions('USERS.USER.UPDATE')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updateUser(id, dto, contextOf(request, ip, user));
  }

  @Patch(':id/status')
  @Permissions('USERS.USER.UPDATE')
  status(
    @Param('id') id: string,
    @Body() dto: UserStatusDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.setUserStatus(id, dto.status, contextOf(request, ip, user));
  }

  @Delete(':id')
  @Permissions('USERS.USER.DELETE')
  delete(
    @Param('id') id: string,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.setUserStatus(id, UserStatus.INACTIVE, contextOf(request, ip, user));
  }
}

@ApiTags('roles')
@ApiBearerAuth()
@Controller({ path: 'roles', version: '1' })
export class RolesController {
  constructor(@Inject(AdministrationService) private readonly service: AdministrationService) {}

  @Get() @Permissions('ROLES.ROLE.READ') list(@Query() query: PageQueryDto) {
    return this.service.listRoles(query);
  }
  @Get(':id')
  @Permissions('ROLES.ROLE.READ')
  findOne(@Param('id') id: string) {
    return this.service.getRole(id);
  }
  @Post()
  @Permissions('ROLES.ROLE.CREATE')
  create(
    @Body() dto: CreateRoleDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createRole(dto, contextOf(request, ip, user));
  }
  @Put(':id')
  @Permissions('ROLES.ROLE.UPDATE')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updateRole(id, dto, contextOf(request, ip, user));
  }
  @Put(':id/permissions')
  @Permissions('ROLES.ROLE.UPDATE')
  permissions(
    @Param('id') id: string,
    @Body() dto: RolePermissionsDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.setRolePermissions(id, dto, contextOf(request, ip, user));
  }
  @Delete(':id')
  @Permissions('ROLES.ROLE.DELETE')
  deactivate(
    @Param('id') id: string,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.deactivateRole(id, contextOf(request, ip, user));
  }
}

@ApiTags('permissions')
@ApiBearerAuth()
@Controller({ path: 'permissions', version: '1' })
export class PermissionsController {
  constructor(@Inject(AdministrationService) private readonly service: AdministrationService) {}

  @Get() @Permissions('PERMISSIONS.PERMISSION.READ') list(@Query() query: PageQueryDto) {
    return this.service.listPermissions(query);
  }
  @Get(':id')
  @Permissions('PERMISSIONS.PERMISSION.READ')
  findOne(@Param('id') id: string) {
    return this.service.getPermission(id);
  }
  @Post()
  @Permissions('PERMISSIONS.PERMISSION.CREATE')
  create(
    @Body() dto: CreatePermissionDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createPermission(dto, contextOf(request, ip, user));
  }
  @Put(':id')
  @Permissions('PERMISSIONS.PERMISSION.UPDATE')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updatePermission(id, dto, contextOf(request, ip, user));
  }
  @Delete(':id')
  @Permissions('PERMISSIONS.PERMISSION.DELETE')
  deactivate(
    @Param('id') id: string,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.deactivatePermission(id, contextOf(request, ip, user));
  }
}

const organizationKinds = {
  companies: 'company',
  units: 'unit',
  areas: 'area',
  teams: 'team',
  positions: 'position',
} as const;

@ApiTags('organization')
@ApiBearerAuth()
@Controller({ path: '', version: '1' })
export class OrganizationController {
  constructor(@Inject(AdministrationService) private readonly service: AdministrationService) {}

  @Get(':resource')
  @Permissions('ORGANIZATION.STRUCTURE.READ')
  list(
    @Param('resource') resource: keyof typeof organizationKinds,
    @Query() query: StatusQueryDto,
  ) {
    return this.service.listOrganization(this.kindOf(resource), query);
  }

  @Get(':resource/:id')
  @Permissions('ORGANIZATION.STRUCTURE.READ')
  findOne(@Param('resource') resource: keyof typeof organizationKinds, @Param('id') id: string) {
    return this.service.getOrganization(this.kindOf(resource), id);
  }

  @Post(':resource')
  @Permissions('ORGANIZATION.STRUCTURE.CREATE')
  create(
    @Param('resource') resource: keyof typeof organizationKinds,
    @Body() dto: CreateOrganizationDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.createOrganization(
      this.kindOf(resource),
      dto,
      contextOf(request, ip, user),
    );
  }

  @Put(':resource/:id')
  @Permissions('ORGANIZATION.STRUCTURE.UPDATE')
  update(
    @Param('resource') resource: keyof typeof organizationKinds,
    @Param('id') id: string,
    @Body() dto: UpdateOrganizationDto,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.updateOrganization(
      this.kindOf(resource),
      id,
      dto,
      contextOf(request, ip, user),
    );
  }

  @Delete(':resource/:id')
  @Permissions('ORGANIZATION.STRUCTURE.DELETE')
  deactivate(
    @Param('resource') resource: keyof typeof organizationKinds,
    @Param('id') id: string,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.service.deactivateOrganization(
      this.kindOf(resource),
      id,
      contextOf(request, ip, user),
    );
  }

  private kindOf(resource: keyof typeof organizationKinds) {
    const kind = organizationKinds[resource];
    if (!kind) throw new NotFoundException();
    return kind;
  }
}

@ApiTags('sessions')
@ApiBearerAuth()
@Controller({ path: 'sessions', version: '1' })
export class SessionsController {
  constructor(@Inject(AdministrationService) private readonly service: AdministrationService) {}

  @Get()
  @Permissions('SESSIONS.SESSION.READ')
  list() {
    return this.service.listSessions();
  }
  @Get('me')
  mine(@CurrentUser() user: AuthenticatedUser) {
    return this.service.listSessions(user.id);
  }
  @Delete(':id')
  @Permissions('SESSIONS.SESSION.REVOKE')
  @HttpCode(204)
  async revoke(
    @Param('id') id: string,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    await this.service.revokeSession(id, contextOf(request, ip, user));
  }
  @Delete('me/others')
  @HttpCode(204)
  async revokeOthers(
    @CurrentUser() user: AuthenticatedUser,
    @Req() request: FastifyRequest,
    @Ip() ip: string,
  ) {
    await this.service.revokeOtherSessions(user, contextOf(request, ip, user));
  }
}
