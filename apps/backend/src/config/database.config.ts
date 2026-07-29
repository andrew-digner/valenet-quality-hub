import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  poolMax: Number(process.env.DATABASE_POOL_MAX),
  timeoutMs: Number(process.env.DATABASE_TIMEOUT_MS),
  url: process.env.DATABASE_URL,
}));
