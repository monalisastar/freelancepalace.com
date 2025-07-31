import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export interface UserSession {
  id: string;
  email: string;
  name?: string;
  role?: string;
  status?: string;
  image?: string;
}

export async function getSession(req: NextRequest): Promise<UserSession | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.id || !token.email) return null;

  return {
    id: token.id as string,
    email: token.email as string,
    name: token.name as string | undefined,
    role: token.role as string | undefined,
    status: token.status as string | undefined,
    image: token.picture as string | undefined,
  };
}
