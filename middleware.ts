import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('cali_session');
  const role = request.cookies.get('cali_role');

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') || 
                       request.nextUrl.pathname.startsWith('/admin-dashboard') ||
                       request.nextUrl.pathname.startsWith('/api/admin');

  const isDashboardRoute = request.nextUrl.pathname === '/dashboard' || 
                           request.nextUrl.pathname.startsWith('/dashboard/');

  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (role?.value !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Redirect logged-in users away from login page
  if (request.nextUrl.pathname === '/login' && session) {
    if (role?.value === 'admin') {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Protect dashboard route - require authentication
  if (isDashboardRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin-dashboard/:path*', '/api/admin/:path*', '/dashboard/:path*', '/login'],
};