'use server';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/shared/supabase/types/supabase';

export const createServerSupabase = () => {
  return createServerComponentClient<Database>({
    cookies
  });
};
