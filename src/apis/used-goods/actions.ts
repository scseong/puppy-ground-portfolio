import { supabase } from '@/shared/supabase/supabase';
import { Tables, TablesInsert } from '@/shared/supabase/types/supabase';

export const createUsedGood = async (
  createUsedGoodInput: TablesInsert<'used_item'>
): Promise<void> => {
  await supabase.from('used_item').insert(createUsedGoodInput).select();
};
