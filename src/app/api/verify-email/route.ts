// /app/api/verify-email/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Email verification temporarily disabled. API key not configured.' },
    { status: 503 }
  );
}

