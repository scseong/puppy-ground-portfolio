import { createClient } from '@supabase/supabase-js';
import { Database } from '@/shared/supabase/types/supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const SUPABASE_SECRET_KEY = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY as string;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
export const secretbase = createClient<Database>(SUPABASE_URL, SUPABASE_SECRET_KEY);
