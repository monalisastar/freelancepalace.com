
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      password,
      role,
      degree,
      institution,
      graduationYear,
      experiences,
      skills,
      portfolio,
      primaryCategory,
      subcategories,
      rate,
      answers,
      acceptedTerms,
      acceptedPolicy,
    } = body;

    // ── Basic validation ─────────────────────────────
    if (!name || !email || !phone || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Extra freelancer validation ──────────────────
    if (role === 'freelancer') {
      if (
        !degree || !institution || !graduationYear ||
        !Array.isArray(experiences) || experiences.length === 0 ||
        !Array.isArray(skills) || skills.length === 0 ||
        !primaryCategory || !rate ||
        !acceptedTerms || !acceptedPolicy
      ) {
        return NextResponse.json({ error: 'Incomplete freelancer application.' }, { status: 400 });
      }
    }

    // ── Check if user already exists ─────────────────
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // ── Hash the password ────────────────────────────
    const hashed = await bcrypt.hash(password, 10);

    // ── TEMP OVERRIDE FOR DEV TESTING ────────────────
    const status = 'active'; // Change to 'pending' later for freelancer verification

    // ── Build user payload ───────────────────────────
    const userPayload: any = {
      name,
      email,
      phone,
      password: hashed,
      role,
      status,
      verified: false,
    };

    if (role === 'freelancer') {
      userPayload.degree = degree;
      userPayload.institution = institution;
      userPayload.graduationYear = graduationYear;
      userPayload.experiences = experiences;
      userPayload.skills = skills;
      userPayload.portfolio = portfolio;
      userPayload.primaryCategory = primaryCategory;
      userPayload.subcategories = subcategories;
      userPayload.rate = rate;
      userPayload.answers = answers;
      userPayload.acceptedTerms = acceptedTerms;
      userPayload.acceptedPolicy = acceptedPolicy;
    }

    // ── Save user to DB ──────────────────────────────
    const newUser = await prisma.user.create({
      data: userPayload,
    });

    // ── Return response (type-safe) ──────────────────
  return NextResponse.json({
  user: {
    id: String(newUser.id),
    name: newUser.name,
    email: newUser.email,
    role: String((newUser as any).role || ''),
    status: String((newUser as any).status || ''),
  },
});


  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}






