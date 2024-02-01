import { createClientComponentClient, createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import { Database } from './shared/supabase/types/supabase';

export async function middleware(req: NextRequest) {
  const supabaseAuth = createClientComponentClient<Database>();
  const res = NextResponse.next();

  console.log('들어오는 값', req);

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });
  const pathname = req.nextUrl.pathname;
  // console.log(pathname);
  // Refresh session if expired - required for Server Components
  const { data } = await supabase.auth.getSession();
  console.log('세션이다', data);

  if (data.session !== null && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (data.session !== null && req.nextUrl.pathname.startsWith('/profile')) {
    await supabaseAuth.auth.signOut();
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (data.session === null && req.nextUrl.pathname.startsWith('/used-goods/create')) {
    await supabaseAuth.auth.signOut();
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  if (data.session === null && req.nextUrl.pathname.startsWith('/used-goods/create')) {
    await supabaseAuth.auth.signOut();
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (data.session === null) {
    await supabaseAuth.auth.signOut();
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    '/auth/:path*'
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
