import { supabase } from '@/shared/supabase/supabase';

export const getPosts = async (id: string) => {
  const { data, error } = await supabase
    .from('mung_stagram')
    .select('*, mung_stagram_like(count), profiles(user_name)')
    .eq('id', id)
    .single();
  return data;
};
