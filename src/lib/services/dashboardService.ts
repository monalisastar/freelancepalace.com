// File: src/app/api/dashboard/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // 1. Grab the cookie so our internal API calls stay authenticated
  const cookie = req.headers.get('cookie') || '';
  const { origin } = new URL(req.url);
  const headers = { cookie, 'Content-Type': 'application/json' };

  // 2. Hit your existing endpoints in parallel
  const [
    meRes,
    jobsRes,
    proposalsRes,
    escrowRes,
    messagesRes,
  ] = await Promise.all([
    fetch(`${origin}/api/me`, { headers }),
    fetch(`${origin}/api/jobs/mine`, { headers }),
    fetch(`${origin}/api/proposals`, { headers }),
    fetch(`${origin}/api/escrow/status`, { headers }),
    fetch(`${origin}/api/messages/mine`, { headers }),
  ]);

  // 3. Quick auth check
  if (!meRes.ok) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // 4. Parse all the JSON
  const me = await meRes.json();
  const jobs = (await jobsRes.json()) as any[];
  const proposals = (await proposalsRes.json()) as any[];
  const escrowData = (await escrowRes.json()) as { pendingPayments: number };
  const messages = (await messagesRes.json()) as any[];

  // 5. Stub out chart data for now
  const jobsData: { month: string; count: number }[] = [];
  const paymentsData: { week: string; amount: number }[] = [];

  // 6. Shape it for the front end
  return NextResponse.json({
    userName: me.name,
    jobsPosted: jobs.length,
    contractsInProgress: proposals.length,
    pendingPayments: escrowData.pendingPayments,
    messagesCount: messages.length,
    jobsData,
    paymentsData,
  });
}



