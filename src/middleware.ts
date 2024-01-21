import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;

  //   if (!accessToken) {
  //     return NextResponse.redirect(new URL('/auth/login', request.url));
  //   }
}
