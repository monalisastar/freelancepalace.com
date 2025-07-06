import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      amount,
      currency,
      counterpartyId,
      counterpartyLabel,
      counterpartyEmail,
      counterpartyPhone,
      description,
      conditions,
      mode,
      creatorEmail, // ✅ provided by form
    } = body;

    // ✅ Validate required fields
    if (
      !amount || !currency || !counterpartyId || !description || !mode ||
      (!counterpartyEmail && !counterpartyPhone) ||
      !creatorEmail
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ Step 1: Find or create the creator user
    let user = await prisma.user.findUnique({ where: { email: creatorEmail } });

    const loginToken = nanoid(32); // secure login token

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: creatorEmail,
          name: 'Anonymous Creator',
          role: 'client',
          loginToken,
          status: 'active', // ✅ Required field added here
        },
      });
    } else {
      await prisma.user.update({
        where: { email: creatorEmail },
        data: { loginToken },
      });
    }

    // ✅ Step 2: Create the escrow deal
    const joinToken = nanoid(24);
    const generatedPassword = nanoid(10); // optional for counterparty login

    const deal = await prisma.escrowDeal.create({
      data: {
        userId: user.id,
        amount: parseFloat(amount),
        currency,
        counterpartyId,
        counterpartyLabel,
        counterpartyEmail,
        counterpartyPhone,
        description,
        conditions,
        mode,
        joinToken,
        status: 'pending',
      },
    });

    // ✅ Step 3: Build success page redirect URL
    const redirectUrl = new URL('/escrow/success', req.url);
    redirectUrl.searchParams.set('dealId', deal.id);
    redirectUrl.searchParams.set('joinLink', `/counterparty/join?deal=${deal.id}&token=${joinToken}`);
    redirectUrl.searchParams.set('password', generatedPassword); // optional

    return NextResponse.json({
      success: true,
      dealId: deal.id,
      loginRedirect: `/auth/magic-login?token=${loginToken}`,
      joinLink: `/counterparty/join?deal=${deal.id}&token=${joinToken}`,
      generatedPassword,
      redirectTo: redirectUrl.toString(), // ✅ for auto-redirect in frontend
    }, { status: 201 });

  } catch (error) {
    console.error('Escrow creation failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

