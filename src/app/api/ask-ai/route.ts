// /src/app/api/ask-ai/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json(
    {
      error: 'This endpoint is currently disabled. OPENAI_API_KEY not configured.',
    },
    { status: 503 }
  );
}

