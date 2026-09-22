import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('apex_access_token');
  const path = request.nextUrl.pathname;

  const isPublicRoute = path === '/login' || path === '/cadastro' || path.startsWith('/api') || path.startsWith('/_next') || path === '/favicon.ico';

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (path === '/login' || path === '/cadastro')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
