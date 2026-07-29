/* eslint-disable @typescript-eslint/no-require-imports -- Jest setup is loaded as CommonJS. */
const path = require('node:path');

const dotenv = require('dotenv');

const workspaceRoot = path.resolve(__dirname, '../../..');

dotenv.config({
  override: false,
  path: [
    path.join(workspaceRoot, '.env.test'),
    path.join(workspaceRoot, '.env.local'),
    path.join(workspaceRoot, '.env.development'),
  ],
  quiet: true,
});

if (process.env.DATABASE_URL) {
  const databaseUrl = new URL(process.env.DATABASE_URL);
  const databaseName = databaseUrl.pathname.replace(/^\//, '');

  process.env.POSTGRES_USER ||= decodeURIComponent(databaseUrl.username);
  process.env.POSTGRES_PASSWORD ||= decodeURIComponent(databaseUrl.password);
  process.env.POSTGRES_DB ||= decodeURIComponent(databaseName);
}

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
