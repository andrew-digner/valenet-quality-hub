import { Inject, Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';

import { PrismaService } from '../../../database/prisma.service.js';

import type { Prisma } from '@prisma/client';

@Injectable()
export class AdministrationRepository {
  constructor(@Inject(PrismaService) readonly prisma: PrismaService) {}

  findAuthorizationUser(id: string) {
    return this.prisma.user.findFirst({
      where: { id, status: UserStatus.ACTIVE, deletedAt: null },
      include: {
        roles: {
          where: { role: { isActive: true, deletedAt: null } },
          include: {
            role: {
              include: {
                permissions: {
                  where: { permission: { isActive: true, deletedAt: null } },
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });
  }

  listUsers(where: Prisma.UserWhereInput, page: number, pageSize: number) {
    return this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { name: 'asc' },
        include: {
          company: true,
          area: true,
          team: true,
          position: true,
          roles: { include: { role: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);
  }
}
