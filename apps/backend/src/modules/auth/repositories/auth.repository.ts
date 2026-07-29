import { Inject, Injectable } from '@nestjs/common';
import { type AuthSession, type User } from '@prisma/client';

import { PrismaService } from '../../../database/prisma.service.js';

import type { RequestMetadata } from '../interfaces/auth.types.js';
import type { AuthAuditEvent } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findSession(id: string): Promise<(AuthSession & { user: User }) | null> {
    return this.prisma.authSession.findUnique({ where: { id }, include: { user: true } });
  }

  createSession(input: {
    userId: string;
    refreshTokenHash: string;
    expiresAt: Date;
    metadata: RequestMetadata;
  }): Promise<AuthSession> {
    return this.prisma.authSession.create({
      data: {
        userId: input.userId,
        refreshTokenHash: input.refreshTokenHash,
        expiresAt: input.expiresAt,
        ipAddress: input.metadata.ipAddress ?? null,
        userAgent: input.metadata.userAgent ?? null,
      },
    });
  }

  updateRefreshToken(id: string, refreshTokenHash: string): Promise<AuthSession> {
    return this.prisma.authSession.update({ where: { id }, data: { refreshTokenHash } });
  }

  revokeSession(id: string): Promise<AuthSession> {
    return this.prisma.authSession.update({ where: { id }, data: { revokedAt: new Date() } });
  }

  async updateLastAccess(id: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { lastAccessAt: new Date() } });
  }

  async recordAudit(input: {
    event: AuthAuditEvent;
    email: string;
    userId?: string;
    metadata: RequestMetadata;
  }): Promise<void> {
    await this.prisma.authAuditLog.create({
      data: {
        event: input.event,
        email: input.email,
        userId: input.userId ?? null,
        ipAddress: input.metadata.ipAddress ?? null,
        userAgent: input.metadata.userAgent ?? null,
      },
    });
  }
}
