import { supabase } from '@/shared/supabase/supabase';
import { Tables, TablesInsert } from '@/shared/supabase/types/supabase';

export const createUsedGood = async (
  createUsedGoodInput: TablesInsert<'used_item'>
): Promise<void> => {
  await supabase.from('used_item').insert(createUsedGoodInput).select();
};

export const updateUsedGood = async (
  id: number,
  updateUsedGoodInput: TablesInsert<'used_item'>
): Promise<void> => {
  await supabase.from('used_item').update(updateUsedGoodInput).eq('id', id).select();
};

export const getUsedGood = async (id: number): Promise<Tables<'used_item'> | null> => {
  const { data } = await supabase.from('used_item').select().eq('id', id);

  return data ? data[0] : null;
};
