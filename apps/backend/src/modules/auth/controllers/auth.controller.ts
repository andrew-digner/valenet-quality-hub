import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  Ip,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { CurrentUser, Public } from '../decorators/auth.decorators.js';
import { AuthService } from '../services/auth.service.js';

import type { CreateSessionDto } from '../dto/create-session.dto.js';
import type { RefreshTokenDto } from '../dto/refresh-token.dto.js';
import type { AuthenticatedUser, RequestMetadata, TokenPair } from '../interfaces/auth.types.js';
import type { FastifyRequest } from 'fastify';

const getMetadata = (request: FastifyRequest, ipAddress: string): RequestMetadata => ({
  ipAddress,
  userAgent: request.headers['user-agent'],
});

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('sessions')
  login(
    @Body() dto: CreateSessionDto,
    @Req() request: FastifyRequest,
    @Ip() ipAddress: string,
  ): Promise<TokenPair> {
    return this.authService.login(dto, getMetadata(request, ipAddress));
  }

  @Public()
  @Post('token-refreshes')
  refresh(
    @Body() dto: RefreshTokenDto,
    @Req() request: FastifyRequest,
    @Ip() ipAddress: string,
  ): Promise<TokenPair> {
    const separator = dto.refreshToken.indexOf('.');
    if (separator < 1) throw new UnauthorizedException();
    return this.authService.refresh(
      dto.refreshToken.slice(0, separator),
      dto.refreshToken.slice(separator + 1),
      getMetadata(request, ipAddress),
    );
  }

  @Delete('sessions/current')
  @HttpCode(204)
  @ApiBearerAuth()
  async logout(
    @CurrentUser() user: AuthenticatedUser,
    @Req() request: FastifyRequest,
    @Ip() ipAddress: string,
  ): Promise<void> {
    await this.authService.logout(user, getMetadata(request, ipAddress));
  }
}
