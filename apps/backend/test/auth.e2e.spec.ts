import { hash } from 'argon2';

import { PrismaService } from '../src/database/prisma.service.js';
import { createApplication } from '../src/shared/application/create-application.js';

import type { TokenPair } from '../src/modules/auth/interfaces/auth.types.js';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

jest.setTimeout(30_000);

describe('Authentication API', () => {
  const email = 'sprint1-auth-test@valenet.local';
  const password = 'S1-test-password!';
  let app: NestFastifyApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    prisma = app.get(PrismaService);
    await prisma.authAuditLog.deleteMany({ where: { email } });
    await prisma.user.deleteMany({ where: { email } });
    await prisma.user.create({
      data: { email, passwordHash: await hash(password) },
    });
  });

  afterAll(async () => {
    await prisma.authAuditLog.deleteMany({ where: { email } });
    await prisma.user.deleteMany({ where: { email } });
    await app.close();
  });

  it('logs in, rotates the refresh token, logs out and audits every action', async () => {
    const loginResponse = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/sessions',
      payload: { email, password },
      headers: { 'user-agent': 'Valenet integration test' },
    });

    expect(loginResponse.statusCode).toBe(201);
    const loginTokens = loginResponse.json<{ data: TokenPair }>().data;
    expect(loginTokens.accessToken).toEqual(expect.any(String));
    expect(loginTokens.refreshToken).toEqual(expect.stringContaining('.'));

    const refreshResponse = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/token-refreshes',
      payload: { refreshToken: loginTokens.refreshToken },
    });

    expect(refreshResponse.statusCode).toBe(201);
    const refreshedTokens = refreshResponse.json<{ data: TokenPair }>().data;
    expect(refreshedTokens.refreshToken).not.toBe(loginTokens.refreshToken);

    const logoutResponse = await app.inject({
      method: 'DELETE',
      url: '/api/v1/auth/sessions/current',
      headers: { authorization: `Bearer ${refreshedTokens.accessToken}` },
    });

    expect(logoutResponse.statusCode).toBe(204);
    const auditEvents = await prisma.authAuditLog.findMany({
      where: { email },
      orderBy: { createdAt: 'asc' },
      select: { event: true },
    });
    expect(auditEvents.map(({ event }) => event)).toEqual(['LOGIN', 'TOKEN_REFRESHED', 'LOGOUT']);
  });

  it('rejects invalid credentials using the canonical error contract', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/sessions',
      payload: { email, password: 'invalid-password' },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toMatchObject({
      success: false,
      error: { code: 'UNAUTHORIZED', details: [] },
      meta: { correlationId: expect.any(String) },
    });
    expect(
      await prisma.authAuditLog.count({
        where: { email, event: 'LOGIN_FAILED' },
      }),
    ).toBe(1);
  });
});
