import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { ObjectId } from 'mongodb';

// Extract deal ID safely from path
function extractDealId(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split('/');
  return segments.length >= 3 ? segments[segments.length - 2] : null;
}

export async function GET(req: NextRequest) {
  const dealId = extractDealId(req);

  if (!dealId || !ObjectId.isValid(dealId)) {
    return NextResponse.json({ error: 'Invalid deal ID' }, { status: 400 });
  }

  try {
    const messages = await prisma.escrowMessage.findMany({
      where: { dealId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    console.error('[GET_MESSAGES_ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession(req as any);

  if (!session || !session.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dealId = extractDealId(req);

  if (!dealId || !ObjectId.isValid(dealId)) {
    return NextResponse.json({ error: 'Invalid deal ID' }, { status: 400 });
  }

  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const message = await prisma.escrowMessage.create({
      data: {
        dealId,
        senderId: session.id,
        content,
      },
    });

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error) {
    console.error('[SEND_MESSAGE_ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}



