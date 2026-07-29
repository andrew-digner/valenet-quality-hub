import { Module } from '@nestjs/common';

import {
  OrganizationController,
  PermissionsController,
  RolesController,
  SessionsController,
  UsersController,
} from './controllers/administration.controller.js';
import { AdministrationRepository } from './repositories/administration.repository.js';
import { AdministrationService } from './services/administration.service.js';

@Module({
  controllers: [
    UsersController,
    RolesController,
    PermissionsController,
    OrganizationController,
    SessionsController,
  ],
  providers: [AdministrationRepository, AdministrationService],
  exports: [AdministrationService],
})
export class AdministrationModule {}
