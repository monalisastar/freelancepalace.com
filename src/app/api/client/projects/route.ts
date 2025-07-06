// app/api/client/projects/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getSession(req as any) as { id: string } | null;

  if (!session || !session.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, category, budget, deadline } = body;

  if (!title || !description || !category || !budget || !deadline) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        budget: parseFloat(budget),
        deadline: new Date(deadline),
        clientId: session.id,
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (err) {
    console.error("[CREATE_JOB_ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


