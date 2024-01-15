import { supabase } from '@/shared/supabase/supabase';
import { TablesInsert } from '@/shared/supabase/types/supabase';

export const createUsedGood = async (
  createUsedGoodInput: TablesInsert<'used_item'>
): Promise<void> => {
  const { data, error } = await supabase.from('used_item').insert(createUsedGoodInput).select();
  // 에러메세지 토스티파이로 변경예정
  if (error) return alert(error.message);
};
