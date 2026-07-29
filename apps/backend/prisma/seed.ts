import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, UserStatus } from '@prisma/client';
import { hash } from 'argon2';

const logger = new Logger('PrismaSeed');

const seed = async (): Promise<void> => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is required.');

  const email = process.env.AUTH_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const password = process.env.AUTH_BOOTSTRAP_PASSWORD;
  if (!email || !password) {
    logger.log('No bootstrap user configured; seed completed without business data.');
    return;
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
  try {
    const passwordHash = await hash(password);
    const permissionCodes = [
      'USERS.USER.READ',
      'USERS.USER.CREATE',
      'USERS.USER.UPDATE',
      'USERS.USER.DELETE',
      'ROLES.ROLE.READ',
      'ROLES.ROLE.CREATE',
      'ROLES.ROLE.UPDATE',
      'ROLES.ROLE.DELETE',
      'PERMISSIONS.PERMISSION.READ',
      'PERMISSIONS.PERMISSION.CREATE',
      'PERMISSIONS.PERMISSION.UPDATE',
      'PERMISSIONS.PERMISSION.DELETE',
      'ORGANIZATION.STRUCTURE.READ',
      'ORGANIZATION.STRUCTURE.CREATE',
      'ORGANIZATION.STRUCTURE.UPDATE',
      'ORGANIZATION.STRUCTURE.DELETE',
      'SESSIONS.SESSION.READ',
      'SESSIONS.SESSION.REVOKE',
      'AUDIT.LOG.READ',
      'AUDIT.LOG.EXPORT',
    ];
    const permissions = await Promise.all(
      permissionCodes.map((code) => {
        const [module, resource, action] = code.split('.') as [string, string, string];
        return prisma.permission.upsert({
          where: { code },
          update: { isActive: true },
          create: { name: code, code, module, resource, action, isSystem: true },
        });
      }),
    );
    const adminRole = await prisma.role.upsert({
      where: { code: 'ADMIN' },
      update: { isActive: true },
      create: {
        name: 'Administrador',
        code: 'ADMIN',
        description: 'Acesso administrativo completo.',
        hierarchy: 100,
        isSystem: true,
      },
    });
    await prisma.rolePermission.createMany({
      data: permissions.map((permission) => ({
        roleId: adminRole.id,
        permissionId: permission.id,
      })),
      skipDuplicates: true,
    });
    const bootstrapUser = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash,
        status: UserStatus.ACTIVE,
        name: 'Administrador',
      },
      create: {
        name: 'Administrador',
        registration: 'ADMIN',
        email,
        passwordHash,
        status: UserStatus.ACTIVE,
        roles: { create: { roleId: adminRole.id, isDefault: true } },
      },
    });
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: bootstrapUser.id, roleId: adminRole.id } },
      update: { isDefault: true },
      create: { userId: bootstrapUser.id, roleId: adminRole.id, isDefault: true },
    });
    logger.log(`Bootstrap user ensured for ${email}.`);
  } finally {
    await prisma.$disconnect();
  }
};

void seed().catch((error: unknown) => {
  logger.error('Seed failed.', error instanceof Error ? error.stack : undefined);
  process.exitCode = 1;
});
