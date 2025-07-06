import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 10;

  try {
    const jobs = await prisma.job.findMany({
      include: {
        client: {
          select: {
            name: true, // ✅ Only expose name
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await prisma.job.count();

    return NextResponse.json({
      jobs,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error: any) {
    console.error('Job fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

