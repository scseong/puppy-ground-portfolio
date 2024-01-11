import { supabase } from '@/shared/supabase/supabase';
import { TablesInsert } from '@/shared/supabase/types/supabase';

export const createUsedGood = async (
  createUsedGoodInput: TablesInsert<'used_item'>
): Promise<void> => {
  console.log(createUsedGoodInput);

  const { data, error } = await supabase.from('used_item').insert(createUsedGoodInput).select();

  console.log(data);
  console.log(error);
};
