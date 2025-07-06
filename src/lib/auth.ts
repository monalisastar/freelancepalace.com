// src/lib/auth.ts

import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * Decodes JWT from cookies in a Next.js middleware-compatible way.
 */
export function getSession(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
      name?: string;
      verified?: boolean;
    };

    return decoded;
  } catch {
    return null;
  }
}




