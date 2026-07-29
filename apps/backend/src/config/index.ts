import aiConfig from './ai.config';
import appConfig from './app.config';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import featureFlagsConfig from './feature-flags.config';
import loggingConfig from './logging.config';
import mailConfig from './mail.config';
import redisConfig from './redis.config';
import storageConfig from './storage.config';

export { validateEnvironment } from './environment.schema';

export const configurationFactories = [
  aiConfig,
  appConfig,
  authConfig,
  databaseConfig,
  featureFlagsConfig,
  loggingConfig,
  mailConfig,
  redisConfig,
  storageConfig,
];
