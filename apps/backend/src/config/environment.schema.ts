import { z } from 'zod';

const booleanFromEnvironment = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');

export const environmentSchema = z.object({
  AI_API_KEY: z.string().optional(),
  AI_ENABLED: booleanFromEnvironment,
  AI_MAX_REQUESTS: z.coerce.number().int().positive().default(100),
  AI_MODEL: z.string().default('not-configured'),
  AI_PROVIDER: z.string().default('disabled'),
  APPEALS_ENABLED: booleanFromEnvironment,
  APP_NAME: z.string().default('Valenet Quality Hub'),
  APP_VERSION: z.string().default('0.1.0'),
  BACKEND_PORT: z.coerce.number().int().min(1).max(65_535).default(3001),
  CALIBRATION_ENABLED: booleanFromEnvironment,
  DATABASE_POOL_MAX: z.coerce.number().int().positive().default(10),
  DATABASE_TIMEOUT_MS: z.coerce.number().int().positive().default(5_000),
  DATABASE_URL: z.string().url(),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().min(32).default('local-refresh-secret-change-before-production'),
  JWT_SECRET: z.string().min(32),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  LOG_RETENTION_DAYS: z.coerce.number().int().positive().default(30),
  MAIL_FROM: z.string().email().default('no-reply@valenet.com.br'),
  NODE_ENV: z.enum(['local', 'development', 'test', 'homologation', 'production']),
  NOTIFICATIONS_ENABLED: booleanFromEnvironment,
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_PORT: z.coerce.number().int().min(1).max(65_535).default(6379),
  SMTP_HOST: z.string().default('localhost'),
  SMTP_PORT: z.coerce.number().int().min(1).max(65_535).default(1025),
  STORAGE_BUCKET: z.string().default('quality-hub'),
  STORAGE_DIRECTORY: z.string().default('uploads'),
  STORAGE_MAX_UPLOAD_MB: z.coerce.number().positive().default(25),
});

export type Environment = z.infer<typeof environmentSchema>;

export const validateEnvironment = (configuration: Record<string, unknown>): Environment => {
  const result = environmentSchema.safeParse(configuration);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return result.data;
};
