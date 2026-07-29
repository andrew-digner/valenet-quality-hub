const requiredEnvironmentVariables = [
  'DATABASE_URL',
  'JWT_REFRESH_SECRET',
  'JWT_SECRET',
  'NODE_ENV',
  'POSTGRES_DB',
  'POSTGRES_PASSWORD',
  'POSTGRES_USER',
];

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} is required to run backend tests.`);
  }
}

const expectedDatabaseUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}?schema=public`;

if (process.env.DATABASE_URL !== expectedDatabaseUrl) {
  throw new Error('DATABASE_URL must match the PostgreSQL test service configuration.');
}
