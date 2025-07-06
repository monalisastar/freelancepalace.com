import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, password, projectType } = body;

    console.log('📝 Incoming registration:', { name, email, company, projectType });

    // Validate required fields
    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('❌ Email already registered:', email);
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Add required 'status' field
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'client',
        status: 'active', // Required field from your schema
        company: company || null,
        projectType: projectType || null,
      },
    });

    console.log('✅ Registration successful for:', user.email);
    return NextResponse.json({ success: true, redirect: '/login' }, { status: 201 });

  } catch (error) {
    console.error('[CLIENT_REGISTER_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


