import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthAuditEvent, UserStatus, type User } from '@prisma/client';
import { hash } from 'argon2';

import { AuthService } from './auth.service.js';

import type { AuthRepository } from '../repositories/auth.repository.js';

describe('AuthService', () => {
  const metadata = { ipAddress: '127.0.0.1', userAgent: 'jest' };

  it('creates an audited session and returns an access and refresh token', async () => {
    const user: User = {
      id: '45cc0d8f-8f3d-45e8-9187-3c6c64fcb843',
      name: 'Administrador',
      socialName: null,
      registration: '1',
      email: 'admin@valenet.com.br',
      phone: null,
      document: null,
      passwordHash: await hash('secure-password'),
      status: UserStatus.ACTIVE,
      mustChangePassword: false,
      lastAccessAt: null,
      companyId: null,
      unitId: null,
      areaId: null,
      teamId: null,
      positionId: null,
      supervisorId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const repository = {
      findUserByEmail: jest.fn().mockResolvedValue(user),
      createSession: jest.fn().mockResolvedValue({ id: 'session-id' }),
      recordAudit: jest.fn().mockResolvedValue(undefined),
      updateLastAccess: jest.fn().mockResolvedValue(undefined),
    } as unknown as AuthRepository;
    const administration = {
      authorization: jest
        .fn()
        .mockResolvedValue({ roles: ['ADMIN'], permissions: ['USERS.USER.READ'] }),
    };
    const service = new AuthService(
      repository,
      new JwtService(),
      new ConfigService({ JWT_SECRET: 'test-secret-with-sufficient-length' }),
      administration as never,
    );

    const result = await service.login(
      { email: user.email, password: 'secure-password' },
      metadata,
    );

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toMatch(/^session-id\./);
    expect(repository.recordAudit).toHaveBeenCalledWith(
      expect.objectContaining({ event: AuthAuditEvent.LOGIN, userId: user.id }),
    );
  });

  it('audits a failed login without revealing whether the user exists', async () => {
    const repository = {
      findUserByEmail: jest.fn().mockResolvedValue(null),
      recordAudit: jest.fn().mockResolvedValue(undefined),
    } as unknown as AuthRepository;
    const service = new AuthService(repository, new JwtService(), new ConfigService(), {
      authorization: jest.fn(),
    } as never);

    await expect(
      service.login({ email: 'missing@valenet.com.br', password: 'invalid-password' }, metadata),
    ).rejects.toThrow('Unauthorized');
    expect(repository.recordAudit).toHaveBeenCalledWith(
      expect.objectContaining({ event: AuthAuditEvent.LOGIN_FAILED }),
    );
  });
});
