import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Helper to extract session from cookie
async function getSessionFromRequest(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return null;

  const token = cookieHeader
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('token='))
    ?.split('=')[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
      name?: string;
    };

    return { user: decoded };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const session = await getSessionFromRequest(req);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const deals = await prisma.escrowDeal.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
        description: true,
        counterpartyLabel: true,
        counterpartyEmail: true,
        counterpartyPhone: true,
      },
    });

    return NextResponse.json({ success: true, deals });
  } catch (error) {
    console.error('Error fetching client deals:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

