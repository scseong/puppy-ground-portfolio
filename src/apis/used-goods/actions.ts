import { supabase } from '@/shared/supabase/supabase';
import { TablesInsert } from '@/shared/supabase/types/supabase';

export const createUsedGood = async (
  createUsedGoodInput: TablesInsert<'used_item'>
): Promise<void> => {
  // 토스티파이로 변경예정
  if (createUsedGoodInput.title === '') return alert ('제목을 입력해주세요');
  if (createUsedGoodInput.content === '') return alert ('내용을 입력해주세요');
  if (createUsedGoodInput.price === 0) return alert ('가격을 입력해주세요');
  if (createUsedGoodInput.main_category_id === 0) return alert ('카테고리를 선택해주세요');
  if (createUsedGoodInput.sub_category_id === 0) return alert ('카테고리를 선택해주세요');
  if (!createUsedGoodInput.photo_url || !createUsedGoodInput.photo_url.length)
  return alert ('사진을 선택해주세요');
  if (createUsedGoodInput.place_name === '') return alert ('위치를 입력해주세요');

  const { data, error } = await supabase.from('used_item').insert(createUsedGoodInput).select();
  // 에러메세지 토스티파이로 변경예정, null이 아닐경우에만 띄울까요
  alert(error);
};
