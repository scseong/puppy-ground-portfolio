import { supabase } from '@/shared/supabase/supabase';

export const getPosts = async (id: string) => {
  const { data, error } = await supabase
    .from('mung_stagram')
    .select('*, mung_stagram_like(count), profiles(user_name)')
    .eq('id', id)
    .single();
  return data;
};

export const getMungstaPosts = async () => {
  const { data } = await supabase
    .from('mung_stagram')
    .select('*, profiles (user_name, avatar_url)');
  return data;
};

export const getMungstaPostsByUserId = async (user_id: string) => {
  const { data } = await supabase
    .from('mung_stagram')
    .select('*, profiles (user_name, avatar_url)')
    .eq('user_id', user_id);
  return data;
};
