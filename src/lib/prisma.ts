// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple clients in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const client = global.prisma || new PrismaClient({
  log: ['query'], // Optional: remove or reduce in prod
});

if (process.env.NODE_ENV === 'development') {
  global.prisma = client;
}

export default client;

