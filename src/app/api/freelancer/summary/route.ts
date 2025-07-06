import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }

  try {
    // Count proposals sent by freelancer
    const jobsApplied = await prisma.proposal.count({
      where: {
        freelancerId: userId,
      },
    });

    // Count contracts awarded to freelancer
    const jobsWon = await prisma.contract.count({
      where: {
        freelancerId: userId,
        status: { not: 'cancelled' },
      },
    });

    // Fetch contract IDs where freelancer matches
    const contracts = await prisma.contract.findMany({
      where: { freelancerId: userId },
      select: { id: true },
    });

    const contractIds = contracts.map((c: any) => c.id);

    // Fetch all successful payments for those contracts
    const payments = await prisma.payment.findMany({
      where: {
        contractId: { in: contractIds },
        status: 'paid',
      },
    });

    const earnings = payments.reduce((sum: number, p: any) => sum + p.amount, 0);

    return NextResponse.json({
      jobsApplied,
      jobsWon,
      earnings,
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


