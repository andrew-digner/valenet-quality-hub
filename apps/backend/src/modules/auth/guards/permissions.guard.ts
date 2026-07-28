import { Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMISSIONS_KEY } from '../decorators/auth.decorators.js';

import type { AuthenticatedUser } from '../interfaces/auth.types.js';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) return true;
    const user = context
      .switchToHttp()
      .getRequest<FastifyRequest & { user: AuthenticatedUser }>().user;
    return required.every((permission) => user.permissions.includes(permission));
  }
}
