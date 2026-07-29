import { RedisHealthService } from '../src/modules/health/redis-health.service.js';
import { createApplication } from '../src/shared/application/create-application.js';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';

describe('Health API', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await createApplication();
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    jest.spyOn(app.get(RedisHealthService), 'isHealthy').mockResolvedValue(true);
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns the canonical success contract and propagates correlation ID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
      headers: { 'x-correlation-id': 'test-correlation-id' },
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['x-correlation-id']).toBe('test-correlation-id');
    expect(response.headers['x-request-id']).toEqual(expect.any(String));
    expect(response.json()).toEqual({
      success: true,
      data: {
        status: 'ok',
        database: 'connected',
        environment: 'test',
        redis: 'connected',
        version: '0.1.0',
        worker: 'not_configured',
      },
      meta: { correlationId: 'test-correlation-id' },
    });
  });

  it('returns the canonical error contract for an unknown resource', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/unknown',
    });
    const body: unknown = response.json();

    expect(response.statusCode).toBe(404);
    expect(body).toMatchObject({
      success: false,
      error: {
        code: 'RESOURCE_NOT_FOUND',
        message: 'Recurso não encontrado.',
        details: [],
      },
      meta: { correlationId: expect.any(String) },
    });
  });
});
