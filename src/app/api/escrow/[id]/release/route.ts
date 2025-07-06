import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

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
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return { user: decoded };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);

  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const segments = req.nextUrl.pathname.split('/');
  const dealId = segments[segments.length - 2]; // from /escrow/[id]/release

  const deal = await prisma.escrowDeal.findUnique({ where: { id: dealId } });

  if (!deal) {
    return NextResponse.json({ success: false, error: 'Deal not found' }, { status: 404 });
  }

  if (deal.userId !== session.user.id) {
    return NextResponse.json({ success: false, error: 'Not allowed' }, { status: 403 });
  }

  const updated = await prisma.escrowDeal.update({
    where: { id: dealId },
    data: { status: 'released' },
  });

  return NextResponse.json({ success: true, deal: updated });
}

