import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const freelancerId = searchParams.get('freelancerId');

  if (!freelancerId) {
    return NextResponse.json({ error: 'Missing freelancerId' }, { status: 400 });
  }

  try {
    const raw = await prisma.proposal.findMany({
      where: { freelancerId },
      include: {
        job: {
          select: { title: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    const proposals = raw.map((p: any) => ({
      id: p.id,
      jobTitle: p.job?.title || 'Untitled Job',
      submittedAt: p.createdAt,
      amount: p.budget,
      status: p.status,
    }));

    return NextResponse.json(proposals);
  } catch (error: any) {
    console.error('Proposal fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

