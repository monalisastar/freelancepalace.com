import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, projectType } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new client user with required `status` field
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'client',
        status: 'active', // ✅ Fix applied here
        projectType: projectType || null,
      },
    });

    return NextResponse.json({ success: true, redirect: '/login' }, { status: 201 });
  } catch (error) {
    console.error('[CLIENT_REGISTER_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

