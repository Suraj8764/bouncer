import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const adminAuthCookie = request.cookies.get('bounce_admin_auth');
    const isAuthenticated = !!(adminAuthCookie && adminAuthCookie.value);

    // If on /admin/login
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // If trying to access any protected admin page without auth
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
