import { TablesInsert } from '@/shared/supabase/types/supabase';
import { supabase } from '@/shared/supabase/supabase';

export const addUsedGoodWish = async (
  addUsedGoodWish: TablesInsert<'used_item_wish'>
): Promise<void> => {
  await supabase.from('used_item_wish').insert(addUsedGoodWish).select();
};

export const removeUsedGoodWish = async (
  removeUsedGoodWish: TablesInsert<'used_item_wish'>
): Promise<void> => {
  await supabase
    .from('used_item_wish')
    .delete()
    .eq('user_id', removeUsedGoodWish.user_id)
    .eq('target_id', removeUsedGoodWish.target_id);
};
