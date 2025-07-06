import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = 'token';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tokenParam = url.searchParams.get('token');

  if (!tokenParam) {
    return NextResponse.redirect(new URL('/login?error=missing_token', req.url));
  }

  const user = await prisma.user.findUnique({
    where: { loginToken: tokenParam },
  });

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=invalid_token', req.url));
  }

  // ✅ Step 1: Create a signed JWT
  const jwtToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // ✅ Step 2: Clear loginToken for security
  await prisma.user.update({
    where: { id: user.id },
    data: { loginToken: null },
  });

  // ✅ Step 3: Set cookie and redirect
  const response = NextResponse.redirect(new URL('/dashboard/escrow', req.url));
  response.cookies.set(COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

