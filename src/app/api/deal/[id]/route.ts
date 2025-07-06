import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

// Local helper to decode session from Request cookies
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
      verified?: boolean;
    };
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

  // Extract deal ID from the path: /deal/[id]
  const segments = req.nextUrl.pathname.split('/');
  const dealId = segments[segments.length - 1];

  try {
    const deal = await prisma.escrowDeal.findUnique({
      where: { id: dealId },
    });

    if (!deal) {
      return NextResponse.json({ success: false, error: 'Deal not found' }, { status: 404 });
    }

    const userId = session.user.id;

    if (deal.userId !== userId) {
      return NextResponse.json({ success: false, error: 'Not allowed' }, { status: 403 });
    }

    const updated = await prisma.escrowDeal.update({
      where: { id: dealId },
      data: {
        status: 'cancelled',
      },
    });

    return NextResponse.json({ success: true, deal: updated });
  } catch (err) {
    console.error('Cancel error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}


