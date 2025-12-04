import { Database } from '@/shared/supabase/types/supabase';

export type Post = Database['public']['Tables']['mung_stagram']['Row'] & {
  profiles: {
    avatar_url: string | null;
    user_name: string;
  } | null;
};
