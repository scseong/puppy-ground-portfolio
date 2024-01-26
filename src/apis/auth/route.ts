import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/shared/supabase/types/supabase';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const display_name = String(formData.get('nickname'));
  const avatar_url = String(formData.get('image'));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });

  await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name,
        avatar_url
      }
    }
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301
  });
}
