import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { Database } from './shared/supabase/types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { pathname } = req.nextUrl;

  // 현재 세션 정보 가져오기
  const { data } = await supabase.auth.getSession();

  // 분기처리 부분 : 멍스타그램 작성/수정, 중고물품 작성/수정, 마이페이지
  if (data.session !== null && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (data.session === null && pathname.startsWith('/profile')) {
    return NextResponse.redirect(
      new URL('/auth/login?alert=로그인 후 이용가능한 서비스입니다', req.url)
    );
  }
  if (data.session === null && pathname.startsWith('/used-goods/create')) {
    return NextResponse.redirect(
      new URL('/auth/login?alert=로그인 후 이용가능한 서비스입니다', req.url)
    );
  }
  if (data.session === null && pathname.startsWith('/used-goods/update')) {
    return NextResponse.redirect(
      new URL('/auth/login?alert=로그인 후 이용가능한 서비스입니다', req.url)
    );
  }
  if (data.session === null && pathname.startsWith('/mungstagram/create')) {
    return NextResponse.redirect(
      new URL('/auth/login?alert=로그인 후 이용가능한 서비스입니다', req.url)
    );
  }

  return res;
}

export const config = {
  matcher: [
    '/facilities',
    '/used-goods/create',
    '/profile',
    '/used-goods/update/:path*',
    '/mungstagram/create',
    '/auth/login',
    '/auth/signup'
  ]
};
