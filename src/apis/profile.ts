import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

//user 정보 가져오기
export const getProfile = async () => {
  const { data: userProfile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', 'f5bee20f-3dbc-4696-8c74-9c0bad7d1218')
    .returns<Tables<'profiles'>>();

  return userProfile;
};

//user 이름 변경
export const updateUserName = async ({ name, userId }: { name: string; userId: string }) => {
  await supabase.from('profiles').update({ user_name: name }).eq('id', userId).select();
};
