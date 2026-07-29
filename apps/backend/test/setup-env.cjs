process.env.NODE_ENV = 'test';
process.env.DATABASE_URL =
  process.env.DATABASE_URL ??
  'postgresql://valenet:change-me-for-local-development@localhost:5432/valenet_quality_hub?schema=public';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-jwt-secret-with-at-least-32-characters';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ?? 'test-refresh-secret-with-at-least-32-characters';
