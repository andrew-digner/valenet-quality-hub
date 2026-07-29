import { registerAs } from '@nestjs/config';

export default registerAs('logging', () => ({
  format: process.env.LOG_FORMAT,
  level: process.env.LOG_LEVEL,
  retentionDays: Number(process.env.LOG_RETENTION_DAYS),
}));
