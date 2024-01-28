import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

//user 정보 가져오기
export const getProfile = async (id: string) => {
  const { data: userProfile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (!userProfile) return;

  return userProfile;
};

//user 이름 변경
export const updateUserProfile = async ({
  user_name,
  id,
  avatar_url
}: {
  user_name: string;
  id: string;
  avatar_url: string;
}) => {
  await supabase.from('profiles').update({ avatar_url, user_name }).eq('id', id).select();
};
