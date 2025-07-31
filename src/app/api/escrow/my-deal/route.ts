import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';

export async function GET(req: Request) {
  const session = await getSession(req as any); // ✅ Await the session properly

  if (!session || !session.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const deals = await prisma.escrowDeal.findMany({
      where: { userId: session.id }, // ✅ Safe to access after awaiting
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ deals }, { status: 200 });
  } catch (error) {
    console.error('[MY-DEALS]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
