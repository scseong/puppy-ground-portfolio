import { createClientComponentClient, createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import { Database } from './shared/supabase/types/supabase';

export async function middleware(req: NextRequest) {
  const supabaseAuth = createClientComponentClient<Database>();
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });
  const pathname = req.nextUrl.pathname;

  // Refresh session if expired - required for Server Components
  const { data } = await supabase.auth.getSession();
  console.log('세션이다', data);

  if (data.session !== null && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (data.session == null && req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(
      new URL('/auth/login?alert=로그인 후 이용가능한 서비스입니다', req.url)
    );
  }

  if (data.session === null && req.nextUrl.pathname.startsWith('/used-goods/create')) {
    // await supabaseAuth.auth.signOut();
    return NextResponse.redirect(
      new URL('/auth/login?alert=로그인 후 이용가능한 서비스입니다', req.url)
    );
  }
  // 분기처리 부분 : 멍스타그램 작성/수정, 중고물품 작성/수정 , 마이페이지, api,

  // if (data.session == null && req.nextUrl.pathname.startsWith('/used-goods/create')) {
  //   await supabaseAuth.auth.signOut();
  //   return NextResponse.redirect(new URL('/auth/login', req.url));
  // }

  // if (data.session === null) {
  //   await supabaseAuth.auth.signOut();
  // }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    '/auth/:path*',
    '/used-goods/create',
    '/profile'
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
