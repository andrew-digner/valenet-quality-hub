import { ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UserStatus } from '@prisma/client';

import { AdministrationService } from './administration.service.js';

const context = {
  actorId: 'actor',
  actorName: 'admin@valenet.local',
  actorRoles: ['ADMIN'],
  correlationId: 'correlation',
};

const record = {
  id: 'id',
  name: 'Name',
  code: 'CODE',
  email: 'user@valenet.local',
  registration: '10',
  passwordHash: 'secret',
  isActive: true,
  isSystem: false,
  deletedAt: null,
  _count: { users: 0, permissions: 0, roles: 0 },
};

const createPrisma = () => {
  const model = () => ({
    findMany: jest.fn().mockResolvedValue([record]),
    findFirst: jest.fn().mockResolvedValue(record),
    findUnique: jest.fn().mockResolvedValue(record),
    count: jest.fn().mockResolvedValue(1),
    create: jest.fn().mockResolvedValue(record),
    update: jest.fn().mockResolvedValue(record),
    updateMany: jest.fn().mockResolvedValue({ count: 2 }),
    deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
    createMany: jest.fn().mockResolvedValue({ count: 1 }),
  });
  const prisma = {
    user: model(),
    role: model(),
    permission: model(),
    company: model(),
    unit: model(),
    area: model(),
    team: model(),
    position: model(),
    authSession: model(),
    userRole: model(),
    rolePermission: model(),
    $transaction: jest.fn(),
  };
  prisma.$transaction.mockImplementation(async (input: unknown) =>
    typeof input === 'function'
      ? (input as (tx: typeof prisma) => Promise<unknown>)(prisma)
      : Promise.all(input as Promise<unknown>[]),
  );
  return prisma;
};

describe('AdministrationService', () => {
  let prisma: ReturnType<typeof createPrisma>;
  let repository: {
    prisma: ReturnType<typeof createPrisma>;
    findAuthorizationUser: jest.Mock;
    listUsers: jest.Mock;
  };
  let audit: { record: jest.Mock };
  let service: AdministrationService;

  beforeEach(() => {
    prisma = createPrisma();
    repository = {
      prisma,
      findAuthorizationUser: jest.fn(),
      listUsers: jest.fn().mockResolvedValue([[record], 1]),
    };
    audit = { record: jest.fn().mockResolvedValue(undefined) };
    service = new AdministrationService(repository as never, audit as never);
  });

  it('resolves roles and deduplicates active permissions', async () => {
    repository.findAuthorizationUser.mockResolvedValue({
      roles: [
        {
          role: {
            code: 'ADMIN',
            permissions: [
              { permission: { code: 'USERS.USER.READ' } },
              { permission: { code: 'USERS.USER.UPDATE' } },
            ],
          },
        },
        {
          role: {
            code: 'AUDITOR',
            permissions: [{ permission: { code: 'USERS.USER.READ' } }],
          },
        },
      ],
    });
    await expect(service.authorization('user')).resolves.toEqual({
      roles: ['ADMIN', 'AUDITOR'],
      permissions: ['USERS.USER.READ', 'USERS.USER.UPDATE'],
    });
    repository.findAuthorizationUser.mockResolvedValue(null);
    await expect(service.authorization('missing')).resolves.toBeNull();
  });

  it('lists and reads users with all supported filters', async () => {
    await expect(
      service.listUsers({
        page: 2,
        pageSize: 10,
        search: 'ana',
        status: UserStatus.ACTIVE,
        roleId: 'role',
        areaId: 'area',
        teamId: 'team',
      }),
    ).resolves.toMatchObject({ pagination: { page: 2, total: 1 } });
    expect(repository.listUsers).toHaveBeenCalledWith(
      expect.objectContaining({ status: UserStatus.ACTIVE, areaId: 'area', teamId: 'team' }),
      2,
      10,
    );
    await expect(service.getUser('id')).resolves.toEqual(record);
    prisma.user.findFirst.mockResolvedValueOnce(null);
    await expect(service.getUser('missing')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('creates, updates and changes user status with audit and session revocation', async () => {
    prisma.company.findFirst.mockResolvedValue(record);
    prisma.area.findFirst.mockResolvedValue(record);
    prisma.team.findFirst.mockResolvedValue(record);
    prisma.role.count.mockResolvedValue(1);
    const dto = {
      name: 'Ana',
      registration: '123',
      email: 'ANA@VALENET.LOCAL',
      companyId: '00000000-0000-4000-8000-000000000001',
      areaId: '00000000-0000-4000-8000-000000000002',
      teamId: '00000000-0000-4000-8000-000000000003',
      roleIds: ['00000000-0000-4000-8000-000000000004'],
    };
    await service.createUser(dto, context);
    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ email: 'ana@valenet.local' }) }),
    );
    await service.updateUser('id', { name: 'Changed', roleIds: dto.roleIds }, context);
    expect(prisma.userRole.deleteMany).toHaveBeenCalled();
    await service.updateUser('id', { name: 'Only name' }, context);
    await service.setUserStatus('id', UserStatus.BLOCKED, context);
    await service.setUserStatus('id', UserStatus.ACTIVE, context);
    expect(prisma.authSession.updateMany).toHaveBeenCalledTimes(1);
    expect(audit.record).toHaveBeenCalled();
  });

  it('rejects inconsistent user organization and roles', async () => {
    prisma.company.findFirst.mockResolvedValue(null);
    prisma.area.findFirst.mockResolvedValue(record);
    prisma.team.findFirst.mockResolvedValue(record);
    prisma.role.count.mockResolvedValue(1);
    await expect(
      service.createUser(
        {
          name: 'Ana',
          registration: '123',
          email: 'ana@valenet.local',
          companyId: 'company',
          areaId: 'area',
          teamId: 'team',
          roleIds: ['role'],
        },
        context,
      ),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('manages roles and role permissions', async () => {
    await expect(
      service.listRoles({ page: 1, pageSize: 20, search: 'adm' }),
    ).resolves.toMatchObject({
      pagination: { total: 1 },
    });
    await expect(service.getRole('id')).resolves.toEqual(record);
    await service.createRole(
      {
        name: 'Supervisor',
        code: 'SUPERVISOR',
        hierarchy: 10,
        permissionIds: ['permission'],
      },
      context,
    );
    await service.updateRole('id', { name: 'Changed' }, context);
    await service.setRolePermissions('id', { permissionIds: ['permission'] }, context);
    await service.deactivateRole('id', context);
    expect(audit.record).toHaveBeenCalledTimes(4);
  });

  it('protects missing, system and used roles', async () => {
    prisma.role.findUnique.mockResolvedValueOnce(null);
    await expect(service.updateRole('missing', {}, context)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    prisma.role.findUnique.mockResolvedValueOnce({ ...record, isSystem: true });
    await expect(service.updateRole('system', {}, context)).rejects.toBeInstanceOf(
      ConflictException,
    );
    prisma.role.findFirst.mockResolvedValueOnce({ ...record, _count: { users: 1 } });
    await expect(service.deactivateRole('used', context)).rejects.toBeInstanceOf(ConflictException);
  });

  it('manages permissions and validates canonical codes', async () => {
    await expect(
      service.listPermissions({ page: 1, pageSize: 20, search: 'users' }),
    ).resolves.toMatchObject({ pagination: { total: 1 } });
    await expect(service.getPermission('id')).resolves.toEqual(record);
    await service.createPermission(
      {
        name: 'Read users',
        code: 'USERS.USER.READ',
        module: 'USERS',
        resource: 'USER',
        action: 'READ',
      },
      context,
    );
    await service.updatePermission('id', { name: 'Read' }, context);
    await service.deactivatePermission('id', context);
    await expect(
      service.createPermission(
        {
          name: 'Invalid',
          code: 'INVALID',
          module: 'USERS',
          resource: 'USER',
          action: 'READ',
        },
        context,
      ),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
  });

  it('protects missing and system permissions', async () => {
    prisma.permission.findUnique.mockResolvedValueOnce(null);
    await expect(service.updatePermission('missing', {}, context)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    prisma.permission.findUnique.mockResolvedValueOnce({ ...record, isSystem: true });
    await expect(service.updatePermission('system', {}, context)).rejects.toBeInstanceOf(
      ConflictException,
    );
    prisma.permission.findFirst.mockResolvedValueOnce({ ...record, isSystem: true });
    await expect(service.deactivatePermission('system', context)).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it.each(['company', 'unit', 'area', 'team', 'position'] as const)(
    'lists, creates, reads and updates organization kind %s',
    async (kind) => {
      await expect(
        service.listOrganization(kind, { page: 1, pageSize: 20, search: 'x', isActive: true }),
      ).resolves.toMatchObject({ pagination: { total: 1 } });
      await expect(service.getOrganization(kind, 'id')).resolves.toEqual(record);
      await service.createOrganization(
        kind,
        {
          name: 'Item',
          code: 'ITEM',
          document: '123',
          companyId: 'company',
          unitId: 'unit',
          areaId: 'area',
          city: 'BH',
          state: 'MG',
        },
        context,
      );
      await service.updateOrganization(kind, 'id', { name: 'Changed' }, context);
    },
  );

  it('rejects missing organization resources', async () => {
    prisma.company.findFirst.mockResolvedValueOnce(null);
    await expect(service.getOrganization('company', 'missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('enforces hierarchy constraints while deactivating organization resources', async () => {
    prisma.team.count.mockResolvedValueOnce(1);
    await expect(service.deactivateOrganization('area', 'id', context)).rejects.toBeInstanceOf(
      ConflictException,
    );
    prisma.user.count.mockResolvedValueOnce(1);
    await expect(service.deactivateOrganization('team', 'id', context)).rejects.toBeInstanceOf(
      ConflictException,
    );
    prisma.team.count.mockResolvedValue(0);
    prisma.user.count.mockResolvedValue(0);
    for (const kind of ['company', 'unit', 'area', 'team', 'position'] as const) {
      await service.deactivateOrganization(kind, 'id', context);
    }
  });

  it('lists and revokes sessions with audit', async () => {
    await service.listSessions();
    await service.listSessions('user');
    await service.revokeSession('id', context);
    await service.revokeOtherSessions({ id: 'user', sessionId: 'current' }, context);
    expect(audit.record).toHaveBeenCalledTimes(2);
    prisma.authSession.findUnique.mockResolvedValueOnce(null);
    await expect(service.revokeSession('missing', context)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
