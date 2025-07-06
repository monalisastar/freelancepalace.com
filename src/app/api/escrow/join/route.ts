import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = 'token';

export async function POST(req: Request) {
  const { dealId, token } = await req.json();

  if (!dealId || !token) {
    return NextResponse.json({ success: false, error: 'Missing token or dealId' }, { status: 400 });
  }

  const deal = await prisma.escrowDeal.findFirst({
    where: {
      id: dealId,
      joinToken: token,
    },
  });

  if (!deal) {
    return NextResponse.json({ success: false, error: 'Invalid or expired link' }, { status: 404 });
  }

  // Determine counterparty identity (email or phone)
  const identifier = deal.counterpartyEmail || deal.counterpartyPhone;
  const role = 'counterparty';

  if (!identifier) {
    return NextResponse.json({ success: false, error: 'Missing counterparty contact info' }, { status: 400 });
  }

  // Create or find counterparty user
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: deal.counterpartyEmail || undefined },
        { name: deal.counterpartyPhone || undefined },
      ],
    },
  });

  const loginToken = nanoid(32);

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: deal.counterpartyEmail || null,
        name: deal.counterpartyPhone || 'Counterparty',
        role,
        loginToken,
        status: 'active', // ✅ Required fix
      },
    });
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: { loginToken },
    });
  }

  // Issue JWT
  const jwtToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({ success: true });

  // Set cookie for login
  response.cookies.set(COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

