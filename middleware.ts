import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;
  const devBypassCookie = req.cookies.get('dev-bypass')?.value;
  const canDevBypassGradeSelection =
    process.env.NODE_ENV !== 'production' &&
    devBypassCookie === 'grade-selection' &&
    pathname.startsWith('/auth/grade-selection');

  const protectedRoutes = ['/dashboard', '/lessons', '/auth/grade-selection'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isAuthenticated && isProtectedRoute) {
    if (canDevBypassGradeSelection) {
      return NextResponse.next();
    }

    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated) {
    const gradeLevel = token?.gradeLevel as string | null | undefined;

    if (pathname === '/') {
      if (gradeLevel) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      return NextResponse.redirect(new URL('/auth/grade-selection', req.url));
    }

    if (pathname.startsWith('/auth/grade-selection') && gradeLevel) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (pathname.startsWith('/dashboard') && !gradeLevel) {
      return NextResponse.redirect(new URL('/auth/grade-selection', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/lessons/:path*', '/auth/grade-selection'],
};
