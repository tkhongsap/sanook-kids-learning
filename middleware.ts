import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/dashboard', '/lessons', '/auth/grade-selection'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isAuthenticated && isProtectedRoute) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && req.auth?.user) {
    const user = req.auth.user;
    
    if (pathname === '/') {
      if (user.gradeLevel) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/auth/grade-selection', req.url));
      }
    }

    if (pathname.startsWith('/auth/grade-selection') && user.gradeLevel) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (pathname.startsWith('/dashboard') && !user.gradeLevel) {
      return NextResponse.redirect(new URL('/auth/grade-selection', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/', '/dashboard/:path*', '/lessons/:path*', '/auth/grade-selection'],
};
