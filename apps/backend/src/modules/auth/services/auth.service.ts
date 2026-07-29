import { randomBytes } from 'node:crypto';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthAuditEvent, UserStatus } from '@prisma/client';
import { hash, verify } from 'argon2';

import { AdministrationService } from '../../administration/services/administration.service.js';
import { AuthRepository } from '../repositories/auth.repository.js';

import type { CreateSessionDto } from '../dto/create-session.dto.js';
import type { AuthenticatedUser, RequestMetadata, TokenPair } from '../interfaces/auth.types.js';

const ACCESS_TOKEN_SECONDS = 900;
const REFRESH_TOKEN_DAYS = 30;

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private readonly repository: AuthRepository,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(AdministrationService) private readonly administration: AdministrationService,
  ) {}

  async login(dto: CreateSessionDto, metadata: RequestMetadata): Promise<TokenPair> {
    const email = dto.email.trim().toLowerCase();
    const user = await this.repository.findUserByEmail(email);
    const isValid =
      user?.status === UserStatus.ACTIVE && (await verify(user.passwordHash, dto.password));
    if (!user || !isValid) {
      await this.repository.recordAudit({ event: AuthAuditEvent.LOGIN_FAILED, email, metadata });
      throw new UnauthorizedException();
    }

    const refreshToken = randomBytes(48).toString('base64url');
    const session = await this.repository.createSession({
      userId: user.id,
      refreshTokenHash: await hash(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_DAYS * 86_400_000),
      metadata,
    });
    await this.repository.recordAudit({
      event: AuthAuditEvent.LOGIN,
      email,
      userId: user.id,
      metadata,
    });
    await this.repository.updateLastAccess(user.id);
    return this.issueTokens(user.id, email, session.id, refreshToken);
  }

  async refresh(
    sessionId: string,
    refreshToken: string,
    metadata: RequestMetadata,
  ): Promise<TokenPair> {
    const session = await this.repository.findSession(sessionId);
    if (session && session.expiresAt <= new Date()) {
      await this.repository.recordAudit({
        event: AuthAuditEvent.SESSION_EXPIRED,
        email: session.user.email,
        userId: session.userId,
        metadata,
      });
      throw new UnauthorizedException();
    }
    const isValid =
      session && !session.revokedAt && (await verify(session.refreshTokenHash, refreshToken));
    if (!session || !isValid) throw new UnauthorizedException();

    const nextRefreshToken = randomBytes(48).toString('base64url');
    await this.repository.updateRefreshToken(session.id, await hash(nextRefreshToken));
    await this.repository.recordAudit({
      event: AuthAuditEvent.TOKEN_REFRESHED,
      email: session.user.email,
      userId: session.userId,
      metadata,
    });
    return this.issueTokens(session.userId, session.user.email, session.id, nextRefreshToken);
  }

  async logout(user: AuthenticatedUser, metadata: RequestMetadata): Promise<void> {
    await this.repository.revokeSession(user.sessionId);
    await this.repository.recordAudit({
      event: AuthAuditEvent.LOGOUT,
      email: user.email,
      userId: user.id,
      metadata,
    });
  }

  verifyAccessToken(token: string): Promise<AuthenticatedUser> {
    return this.jwtService.verifyAsync<AuthenticatedUser>(token, {
      secret: this.getJwtSecret(),
    });
  }

  private async issueTokens(
    userId: string,
    email: string,
    sessionId: string,
    refreshToken: string,
  ): Promise<TokenPair> {
    const authorization = await this.administration.authorization(userId);
    if (!authorization) throw new UnauthorizedException();
    const payload: AuthenticatedUser = {
      id: userId,
      email,
      sessionId,
      roles: authorization.roles,
      permissions: authorization.permissions,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.getJwtSecret(),
        expiresIn: ACCESS_TOKEN_SECONDS,
      }),
      refreshToken: `${sessionId}.${refreshToken}`,
      expiresIn: ACCESS_TOKEN_SECONDS,
    };
  }

  private getJwtSecret(): string {
    const configuredSecret = this.config.get<string>('JWT_SECRET');
    if (configuredSecret) return configuredSecret;
    if (this.config.get<string>('NODE_ENV') === 'production') {
      throw new Error('JWT_SECRET must be configured in production.');
    }
    return 'development-only-change-me';
  }
}
