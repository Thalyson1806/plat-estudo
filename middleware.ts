import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const PROTECTED_EXACT = ['/forum/nova', '/materias/nova'];
const PROTECTED_PATTERN = /^\/materias\/[^/]+\/novo-topico/;

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;

  const isProtected =
    PROTECTED_EXACT.some(p => path.startsWith(p)) ||
    PROTECTED_PATTERN.test(path);

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
