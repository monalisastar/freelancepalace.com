import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Example: Prevent freelancers from accessing client dashboard
    if (url.pathname.startsWith('/dashboard/client') && token.role !== 'client') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (url.pathname.startsWith('/dashboard/freelancer') && token.role !== 'freelancer') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*'],
};

