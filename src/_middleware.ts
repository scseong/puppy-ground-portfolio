import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // const accessToken = req.cookies.get('access_token')?.value;
  const pathname = req.nextUrl.pathname;

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  console.log('유저정보', user);

  if (user && pathname === '/auth/:path*') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!user && pathname === '/used-goods/create') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (!user && pathname === '/used-goods/update/:path*') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (!user && pathname === '/profile/:path*') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return res;
}

export const config = {
  matcher: ['/used-goods/create', '/profile/:path*', '/auth/:path*', '/used-goods/update/:path*']
};
