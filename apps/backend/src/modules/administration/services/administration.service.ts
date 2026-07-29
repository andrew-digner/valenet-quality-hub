import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuditOperation, Prisma, UserStatus } from '@prisma/client';
import { hash } from 'argon2';

import { AuditService, pagination, type AuditContext } from '../../audit/audit.service.js';
import { AdministrationRepository } from '../repositories/administration.repository.js';

import type {
  CreateOrganizationDto,
  CreatePermissionDto,
  CreateRoleDto,
  CreateUserDto,
  PageQueryDto,
  RolePermissionsDto,
  UpdatePermissionDto,
  UpdateOrganizationDto,
  UpdateRoleDto,
  UpdateUserDto,
} from '../dto/administration.dto.js';

@Injectable()
export class AdministrationService {
  constructor(
    @Inject(AdministrationRepository) private readonly repository: AdministrationRepository,
    @Inject(AuditService) private readonly audit: AuditService,
  ) {}

  async authorization(id: string) {
    const user = await this.repository.findAuthorizationUser(id);
    if (!user) return null;
    return {
      roles: user.roles.map(({ role }) => role.code),
      permissions: [
        ...new Set(
          user.roles.flatMap(({ role }) =>
            role.permissions.map(({ permission }) => permission.code),
          ),
        ),
      ],
    };
  }

  async listUsers(
    query: PageQueryDto & {
      status?: UserStatus;
      roleId?: string;
      areaId?: string;
      teamId?: string;
    },
  ) {
    const where: Prisma.UserWhereInput = {
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
      ...(query.areaId ? { areaId: query.areaId } : {}),
      ...(query.teamId ? { teamId: query.teamId } : {}),
      ...(query.roleId ? { roles: { some: { roleId: query.roleId } } } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: Prisma.QueryMode.insensitive } },
              { email: { contains: query.search, mode: Prisma.QueryMode.insensitive } },
              { registration: { contains: query.search, mode: Prisma.QueryMode.insensitive } },
            ],
          }
        : {}),
    };
    const [data, total] = await this.repository.listUsers(where, query.page, query.pageSize);
    return { data, pagination: pagination(query.page, query.pageSize, total) };
  }

  async getUser(id: string) {
    const user = await this.repository.prisma.user.findFirst({
      where: { id, deletedAt: null },
      include: {
        company: true,
        unit: true,
        area: true,
        team: true,
        position: true,
        roles: { include: { role: true } },
        sessions: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async createUser(dto: CreateUserDto, context: AuditContext) {
    await this.validateUserRelations(dto.companyId, dto.areaId, dto.teamId, dto.roleIds);
    try {
      const { roleIds, ...userData } = dto;
      const created = await this.repository.prisma.user.create({
        data: {
          ...userData,
          email: dto.email.toLowerCase(),
          passwordHash: await hash(crypto.randomUUID()),
          status: UserStatus.PENDING_ACTIVATION,
          mustChangePassword: true,
          roles: { create: roleIds.map((roleId, index) => ({ roleId, isDefault: index === 0 })) },
        },
      });
      await this.audit.record({
        context,
        module: 'USERS',
        resource: 'users',
        resourceId: created.id,
        operation: AuditOperation.CREATE,
        after: this.safeUser(created),
      });
      return this.getUser(created.id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
        throw new ConflictException();
      throw error;
    }
  }

  async updateUser(id: string, dto: UpdateUserDto, context: AuditContext) {
    const before = await this.getUser(id);
    const { roleIds, ...data } = dto;
    const updated = await this.repository.prisma.$transaction(async (tx) => {
      const user = await tx.user.update({ where: { id }, data });
      if (roleIds) {
        await tx.userRole.deleteMany({ where: { userId: id } });
        await tx.userRole.createMany({
          data: roleIds.map((roleId, index) => ({ userId: id, roleId, isDefault: index === 0 })),
        });
      }
      return user;
    });
    await this.audit.record({
      context,
      module: 'USERS',
      resource: 'users',
      resourceId: id,
      operation: AuditOperation.UPDATE,
      before: this.safeUser(before),
      after: this.safeUser(updated),
    });
    return this.getUser(id);
  }

  async setUserStatus(id: string, status: UserStatus, context: AuditContext) {
    const before = await this.getUser(id);
    const updated = await this.repository.prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id },
        data: { status, deletedAt: status === UserStatus.INACTIVE ? new Date() : null },
      });
      if (
        status === UserStatus.BLOCKED ||
        status === UserStatus.INACTIVE ||
        status === UserStatus.SUSPENDED
      ) {
        await tx.authSession.updateMany({
          where: { userId: id, revokedAt: null },
          data: { revokedAt: new Date() },
        });
      }
      return user;
    });
    await this.audit.record({
      context,
      module: 'USERS',
      resource: 'users',
      resourceId: id,
      operation: AuditOperation.UPDATE,
      before: this.safeUser(before),
      after: this.safeUser(updated),
    });
    return updated;
  }

  async listRoles(query: PageQueryDto) {
    const where: Prisma.RoleWhereInput = {
      deletedAt: null,
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' as const } },
              { code: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };
    const [data, total] = await this.repository.prisma.$transaction([
      this.repository.prisma.role.findMany({
        where,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        include: { _count: { select: { users: true, permissions: true } } },
        orderBy: { name: 'asc' },
      }),
      this.repository.prisma.role.count({ where }),
    ]);
    return { data, pagination: pagination(query.page, query.pageSize, total) };
  }

  async getRole(id: string) {
    const role = await this.repository.prisma.role.findFirst({
      where: { id, deletedAt: null },
      include: {
        permissions: { include: { permission: true } },
        users: { include: { user: true } },
        _count: { select: { users: true, permissions: true } },
      },
    });
    if (!role) throw new NotFoundException();
    return role;
  }

  async createRole(dto: CreateRoleDto, context: AuditContext) {
    const role = await this.repository.prisma.role.create({
      data: {
        name: dto.name,
        code: dto.code,
        ...(dto.description ? { description: dto.description } : {}),
        hierarchy: dto.hierarchy,
        permissions: { create: dto.permissionIds.map((permissionId) => ({ permissionId })) },
      },
    });
    await this.audit.record({
      context,
      module: 'ROLES',
      resource: 'roles',
      resourceId: role.id,
      operation: AuditOperation.CREATE,
      after: role,
    });
    return role;
  }

  async updateRole(id: string, dto: UpdateRoleDto, context: AuditContext) {
    const before = await this.repository.prisma.role.findUnique({ where: { id } });
    if (!before) throw new NotFoundException();
    if (before.isSystem) throw new ConflictException();
    const role = await this.repository.prisma.role.update({ where: { id }, data: dto });
    await this.audit.record({
      context,
      module: 'ROLES',
      resource: 'roles',
      resourceId: id,
      operation: AuditOperation.UPDATE,
      before,
      after: role,
    });
    return role;
  }

  async deactivateRole(id: string, context: AuditContext) {
    const before = await this.getRole(id);
    if (before.isSystem) throw new ConflictException();
    if (before._count.users > 0) throw new ConflictException();
    const role = await this.repository.prisma.role.update({
      where: { id },
      data: { isActive: false, deletedAt: new Date() },
    });
    await this.audit.record({
      context,
      module: 'ROLES',
      resource: 'roles',
      resourceId: id,
      operation: AuditOperation.DELETE,
      before: this.json(before),
      after: role,
    });
    return role;
  }

  async setRolePermissions(id: string, dto: RolePermissionsDto, context: AuditContext) {
    const before = await this.repository.prisma.rolePermission.findMany({ where: { roleId: id } });
    await this.repository.prisma.$transaction([
      this.repository.prisma.rolePermission.deleteMany({ where: { roleId: id } }),
      this.repository.prisma.rolePermission.createMany({
        data: dto.permissionIds.map((permissionId) => ({ roleId: id, permissionId })),
      }),
    ]);
    await this.audit.record({
      context,
      module: 'ROLES',
      resource: 'role_permissions',
      resourceId: id,
      operation: AuditOperation.UPDATE,
      before,
      after: dto.permissionIds,
    });
    return this.repository.prisma.role.findUnique({
      where: { id },
      include: { permissions: { include: { permission: true } } },
    });
  }

  async listPermissions(query: PageQueryDto) {
    const where: Prisma.PermissionWhereInput = {
      deletedAt: null,
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' as const } },
              { code: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };
    const [data, total] = await this.repository.prisma.$transaction([
      this.repository.prisma.permission.findMany({
        where,
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        include: { _count: { select: { roles: true } } },
        orderBy: [{ module: 'asc' }, { code: 'asc' }],
      }),
      this.repository.prisma.permission.count({ where }),
    ]);
    return { data, pagination: pagination(query.page, query.pageSize, total) };
  }

  async getPermission(id: string) {
    const permission = await this.repository.prisma.permission.findFirst({
      where: { id, deletedAt: null },
      include: {
        roles: { include: { role: true } },
        _count: { select: { roles: true } },
      },
    });
    if (!permission) throw new NotFoundException();
    return permission;
  }

  async createPermission(dto: CreatePermissionDto, context: AuditContext) {
    const expected = `${dto.module}.${dto.resource}.${dto.action}`.toUpperCase();
    if (dto.code !== expected) throw new UnprocessableEntityException();
    const permission = await this.repository.prisma.permission.create({ data: dto });
    await this.audit.record({
      context,
      module: 'PERMISSIONS',
      resource: 'permissions',
      resourceId: permission.id,
      operation: AuditOperation.CREATE,
      after: permission,
    });
    return permission;
  }

  async updatePermission(id: string, dto: UpdatePermissionDto, context: AuditContext) {
    const before = await this.repository.prisma.permission.findUnique({ where: { id } });
    if (!before) throw new NotFoundException();
    if (before.isSystem) throw new ConflictException();
    const permission = await this.repository.prisma.permission.update({ where: { id }, data: dto });
    await this.audit.record({
      context,
      module: 'PERMISSIONS',
      resource: 'permissions',
      resourceId: id,
      operation: AuditOperation.UPDATE,
      before,
      after: permission,
    });
    return permission;
  }

  async deactivatePermission(id: string, context: AuditContext) {
    const before = await this.getPermission(id);
    if (before.isSystem) throw new ConflictException();
    const permission = await this.repository.prisma.permission.update({
      where: { id },
      data: { isActive: false, deletedAt: new Date() },
    });
    await this.audit.record({
      context,
      module: 'PERMISSIONS',
      resource: 'permissions',
      resourceId: id,
      operation: AuditOperation.DELETE,
      before: this.json(before),
      after: permission,
    });
    return permission;
  }

  async listOrganization(
    kind: 'company' | 'unit' | 'area' | 'team' | 'position',
    query: PageQueryDto & { isActive?: boolean },
  ) {
    const where = {
      deletedAt: null,
      ...(query.isActive === undefined ? {} : { isActive: query.isActive }),
      ...(query.search
        ? { name: { contains: query.search, mode: Prisma.QueryMode.insensitive } }
        : {}),
    };
    const page = { skip: (query.page - 1) * query.pageSize, take: query.pageSize };
    let result: [unknown[], number];
    switch (kind) {
      case 'company':
        result = await this.repository.prisma.$transaction([
          this.repository.prisma.company.findMany({ where, ...page, orderBy: { name: 'asc' } }),
          this.repository.prisma.company.count({ where }),
        ]);
        break;
      case 'unit':
        result = await this.repository.prisma.$transaction([
          this.repository.prisma.unit.findMany({
            where,
            ...page,
            orderBy: { name: 'asc' },
            include: { company: true },
          }),
          this.repository.prisma.unit.count({ where }),
        ]);
        break;
      case 'area':
        result = await this.repository.prisma.$transaction([
          this.repository.prisma.area.findMany({
            where,
            ...page,
            orderBy: { name: 'asc' },
            include: { company: true, unit: true },
          }),
          this.repository.prisma.area.count({ where }),
        ]);
        break;
      case 'team':
        result = await this.repository.prisma.$transaction([
          this.repository.prisma.team.findMany({
            where,
            ...page,
            orderBy: { name: 'asc' },
            include: { area: true },
          }),
          this.repository.prisma.team.count({ where }),
        ]);
        break;
      case 'position':
        result = await this.repository.prisma.$transaction([
          this.repository.prisma.position.findMany({
            where,
            ...page,
            orderBy: { name: 'asc' },
            include: { company: true },
          }),
          this.repository.prisma.position.count({ where }),
        ]);
        break;
    }
    return { data: result[0], pagination: pagination(query.page, query.pageSize, result[1]) };
  }

  async getOrganization(
    kind: 'company' | 'unit' | 'area' | 'team' | 'position',
    id: string,
  ): Promise<object> {
    let record: object | null;
    if (kind === 'company')
      record = await this.repository.prisma.company.findFirst({ where: { id, deletedAt: null } });
    else if (kind === 'unit')
      record = await this.repository.prisma.unit.findFirst({ where: { id, deletedAt: null } });
    else if (kind === 'area')
      record = await this.repository.prisma.area.findFirst({ where: { id, deletedAt: null } });
    else if (kind === 'team')
      record = await this.repository.prisma.team.findFirst({ where: { id, deletedAt: null } });
    else
      record = await this.repository.prisma.position.findFirst({ where: { id, deletedAt: null } });
    if (!record) throw new NotFoundException();
    return record;
  }

  async createOrganization(
    kind: 'company' | 'unit' | 'area' | 'team' | 'position',
    dto: CreateOrganizationDto,
    context: AuditContext,
  ) {
    const data =
      kind === 'company'
        ? { name: dto.name, tradeName: dto.tradeName, document: dto.document ?? dto.code }
        : kind === 'unit'
          ? {
              name: dto.name,
              code: dto.code,
              companyId: dto.companyId!,
              city: dto.city,
              state: dto.state,
            }
          : kind === 'area'
            ? { name: dto.name, code: dto.code, companyId: dto.companyId!, unitId: dto.unitId }
            : kind === 'team'
              ? { name: dto.name, code: dto.code, areaId: dto.areaId! }
              : { name: dto.name, code: dto.code, companyId: dto.companyId! };
    let created: { id: string };
    if (kind === 'company')
      created = await this.repository.prisma.company.create({
        data: data as Prisma.CompanyUncheckedCreateInput,
      });
    else if (kind === 'unit')
      created = await this.repository.prisma.unit.create({
        data: data as Prisma.UnitUncheckedCreateInput,
      });
    else if (kind === 'area')
      created = await this.repository.prisma.area.create({
        data: data as Prisma.AreaUncheckedCreateInput,
      });
    else if (kind === 'team')
      created = await this.repository.prisma.team.create({
        data: data as Prisma.TeamUncheckedCreateInput,
      });
    else
      created = await this.repository.prisma.position.create({
        data: data as Prisma.PositionUncheckedCreateInput,
      });
    await this.audit.record({
      context,
      module: 'ORGANIZATION',
      resource: `${kind}s`,
      resourceId: created.id,
      operation: AuditOperation.CREATE,
      after: created,
    });
    return created;
  }

  async updateOrganization(
    kind: 'company' | 'unit' | 'area' | 'team' | 'position',
    id: string,
    dto: UpdateOrganizationDto,
    context: AuditContext,
  ) {
    const before = await this.getOrganization(kind, id);
    let updated: object;
    if (kind === 'company')
      updated = await this.repository.prisma.company.update({ where: { id }, data: dto });
    else if (kind === 'unit')
      updated = await this.repository.prisma.unit.update({ where: { id }, data: dto });
    else if (kind === 'area')
      updated = await this.repository.prisma.area.update({ where: { id }, data: dto });
    else if (kind === 'team')
      updated = await this.repository.prisma.team.update({ where: { id }, data: dto });
    else updated = await this.repository.prisma.position.update({ where: { id }, data: dto });
    await this.audit.record({
      context,
      module: 'ORGANIZATION',
      resource: `${kind}s`,
      resourceId: id,
      operation: AuditOperation.UPDATE,
      before: this.json(before),
      after: this.json(updated),
    });
    return updated;
  }

  async deactivateOrganization(
    kind: 'company' | 'unit' | 'area' | 'team' | 'position',
    id: string,
    context: AuditContext,
  ) {
    const before = await this.getOrganization(kind, id);
    if (kind === 'area') {
      const activeTeams = await this.repository.prisma.team.count({
        where: { areaId: id, isActive: true, deletedAt: null },
      });
      if (activeTeams > 0) throw new ConflictException();
    }
    if (kind === 'team') {
      const activeUsers = await this.repository.prisma.user.count({
        where: { teamId: id, status: UserStatus.ACTIVE, deletedAt: null },
      });
      if (activeUsers > 0) throw new ConflictException();
    }
    const data = { isActive: false, deletedAt: new Date() };
    let updated: object;
    if (kind === 'company')
      updated = await this.repository.prisma.company.update({ where: { id }, data });
    else if (kind === 'unit')
      updated = await this.repository.prisma.unit.update({ where: { id }, data });
    else if (kind === 'area')
      updated = await this.repository.prisma.area.update({ where: { id }, data });
    else if (kind === 'team')
      updated = await this.repository.prisma.team.update({ where: { id }, data });
    else updated = await this.repository.prisma.position.update({ where: { id }, data });
    await this.audit.record({
      context,
      module: 'ORGANIZATION',
      resource: `${kind}s`,
      resourceId: id,
      operation: AuditOperation.DELETE,
      before: this.json(before),
      after: this.json(updated),
    });
    return updated;
  }

  listSessions(userId?: string) {
    return this.repository.prisma.authSession.findMany({
      where: { ...(userId ? { userId } : {}), revokedAt: null },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { lastActivityAt: 'desc' },
    });
  }

  async revokeSession(id: string, context: AuditContext) {
    const session = await this.repository.prisma.authSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException();
    const updated = await this.repository.prisma.authSession.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
    await this.audit.record({
      context,
      module: 'SESSIONS',
      resource: 'sessions',
      resourceId: id,
      operation: AuditOperation.DELETE,
      before: this.json(session),
      after: this.json(updated),
    });
  }

  async revokeOtherSessions(user: { id: string; sessionId: string }, context: AuditContext) {
    const result = await this.repository.prisma.authSession.updateMany({
      where: { userId: user.id, id: { not: user.sessionId }, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    await this.audit.record({
      context,
      module: 'SESSIONS',
      resource: 'sessions',
      resourceId: user.id,
      operation: AuditOperation.DELETE,
      metadata: { scope: 'other_sessions', revokedCount: result.count },
    });
  }

  private async validateUserRelations(
    companyId: string,
    areaId: string,
    teamId: string,
    roleIds: string[],
  ) {
    const [company, area, team, roles] = await Promise.all([
      this.repository.prisma.company.findFirst({
        where: { id: companyId, isActive: true, deletedAt: null },
      }),
      this.repository.prisma.area.findFirst({
        where: { id: areaId, companyId, isActive: true, deletedAt: null },
      }),
      this.repository.prisma.team.findFirst({
        where: { id: teamId, areaId, isActive: true, deletedAt: null },
      }),
      this.repository.prisma.role.count({
        where: { id: { in: roleIds }, isActive: true, deletedAt: null },
      }),
    ]);
    if (!company || !area || !team || roles !== new Set(roleIds).size)
      throw new UnprocessableEntityException();
  }

  private safeUser(user: object): Prisma.InputJsonValue {
    const safe = { ...(user as Record<string, unknown>) };
    delete safe.passwordHash;
    return JSON.parse(JSON.stringify(safe)) as Prisma.InputJsonValue;
  }

  private json(value: object): Prisma.InputJsonValue {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  }
}
