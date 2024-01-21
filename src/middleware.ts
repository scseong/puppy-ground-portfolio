import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  if (accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
export const config = {
  // 이 Middleware가 동작할 경로들을 추가해주면된다.
  matcher: [
    '/used-goods/:path*',
    '/profile/:path*',
    '/stray-dogs/:path*',
    '/facilities',
    '/auth/:path*'
  ]
};
