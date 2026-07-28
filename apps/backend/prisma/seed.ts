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
    await prisma.user.upsert({
      where: { email },
      update: { passwordHash, status: UserStatus.ACTIVE },
      create: {
        email,
        passwordHash,
        status: UserStatus.ACTIVE,
      },
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
