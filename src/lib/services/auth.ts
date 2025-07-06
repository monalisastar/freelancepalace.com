// src/lib/services/auth.ts

import prisma from '@/lib/prisma';

// Strip out any password‐compare logic—just fetch by email
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}


