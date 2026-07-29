import { AuditService, pagination } from './audit.service.js';

const context = {
  actorId: 'actor',
  actorName: 'Admin',
  actorRoles: ['ADMIN'],
  correlationId: 'correlation',
  requestId: 'request',
  ipAddress: '127.0.0.1',
  userAgent: 'jest',
};

const record = {
  id: 'id',
  actorName: 'Admin',
  actorRoles: ['ADMIN'],
  module: 'USERS',
  resource: 'users',
  resourceId: 'resource',
  operation: 'UPDATE',
  result: 'SUCCESS',
  ipAddress: '127.0.0.1',
  correlationId: 'correlation',
  createdAt: new Date('2026-07-29T12:00:00.000Z'),
};

describe('AuditService', () => {
  const createPrisma = () => ({
    auditLog: {
      create: jest.fn().mockResolvedValue(record),
      findMany: jest.fn().mockResolvedValue([record]),
      findUnique: jest.fn().mockResolvedValue(record),
      count: jest.fn().mockResolvedValue(1),
    },
    $transaction: jest.fn().mockImplementation((values: Promise<unknown>[]) => Promise.all(values)),
  });

  it('records complete and minimal immutable audit events', async () => {
    const prisma = createPrisma();
    const service = new AuditService(prisma as never);
    await service.record({
      context,
      module: 'USERS',
      resource: 'users',
      resourceId: 'resource',
      operation: 'UPDATE',
      before: { name: 'Before' },
      after: { name: 'After' },
      metadata: { reason: 'test' },
    });
    await service.record({
      context: { correlationId: 'minimal' },
      module: 'AUTH',
      resource: 'sessions',
      operation: 'LOGIN',
    });
    expect(prisma.auditLog.create).toHaveBeenCalledTimes(2);
  });

  it('lists with filters and audits the consultation', async () => {
    const prisma = createPrisma();
    const service = new AuditService(prisma as never);
    await expect(
      service.list(
        {
          page: 2,
          pageSize: 10,
          module: 'USERS',
          operation: 'UPDATE',
          actorId: 'actor',
          correlationId: 'correlation',
        },
        context,
      ),
    ).resolves.toMatchObject({ pagination: { page: 2, total: 1 } });
    await service.list({ page: 1, pageSize: 20 });
    expect(prisma.auditLog.create).toHaveBeenCalledTimes(1);
  });

  it('reads and audits details', async () => {
    const prisma = createPrisma();
    const service = new AuditService(prisma as never);
    await expect(service.findOne('id', context)).resolves.toEqual(record);
    await expect(service.findOne('id')).resolves.toEqual(record);
  });

  it.each([
    ['csv', 'text/csv; charset=utf-8', 'csv'],
    ['excel', 'application/vnd.ms-excel', 'xls'],
    ['pdf', 'application/pdf', 'pdf'],
  ] as const)('exports %s and audits the operation', async (format, contentType, extension) => {
    const prisma = createPrisma();
    const service = new AuditService(prisma as never);
    const result = await service.export(format, context);
    expect(result.contentType).toBe(contentType);
    expect(result.extension).toBe(extension);
    expect(result.buffer.length).toBeGreaterThan(20);
    expect(prisma.auditLog.create).toHaveBeenCalledTimes(1);
  });

  it('calculates pagination, including empty results', () => {
    expect(pagination(1, 20, 0)).toEqual({ page: 1, pageSize: 20, total: 0, totalPages: 0 });
    expect(pagination(2, 10, 21).totalPages).toBe(3);
  });
});
