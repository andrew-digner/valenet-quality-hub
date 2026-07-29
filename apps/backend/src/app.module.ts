import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ObservabilityModule } from './common/observability.module.js';
import { configurationFactories, validateEnvironment } from './config/index.js';
import { DatabaseModule } from './database/database.module.js';
import { AdministrationModule } from './modules/administration/administration.module.js';
import { AuditModule } from './modules/audit/audit.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV ?? 'development'}.local`,
        `.env.${process.env.NODE_ENV ?? 'development'}`,
        '.env.local',
        '.env',
      ],
      isGlobal: true,
      load: configurationFactories,
      validate: validateEnvironment,
    }),
    ObservabilityModule,
    DatabaseModule,
    AuditModule,
    AuthModule,
    AdministrationModule,
    HealthModule,
  ],
})
export class AppModule {}
