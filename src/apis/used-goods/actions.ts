import { supabase } from '@/shared/supabase/supabase';
import { Tables, TablesInsert, TablesUpdate } from '@/shared/supabase/types/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const createUsedGood = async (
  createUsedGoodInput: TablesInsert<'used_item'>
): Promise<void> => {
  await supabase.from('used_item').insert(createUsedGoodInput).select();
};

export const updateUsedGood = async (
  id: number,
  updateUsedGoodInput: TablesUpdate<'used_item'>
): Promise<PostgrestSingleResponse<Tables<'used_item'>[]>> => {
  return await supabase.from('used_item').update(updateUsedGoodInput).eq('id', id).select();
};

export const getUsedGood = async (id: number): Promise<Tables<'used_item'> | null> => {
  const { data } = await supabase.from('used_item').select().eq('id', id);

  return data ? data[0] : null;
};

export const deleteUsedGood = async (id: number): Promise<void> => {
  await supabase.from('used_item').delete().eq('id', id).select();
};
