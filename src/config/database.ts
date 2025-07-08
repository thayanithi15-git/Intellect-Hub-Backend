// src/config/prisma.ts or database.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple instances in development
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
