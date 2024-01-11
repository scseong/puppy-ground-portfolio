import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

// 동반시설 데이터 가져오기
export const fetchFacilities = async () => {
  const fetchFacilitiesQuery = await supabase
    .from('facilities')
    .select('*')
    .returns<Tables<'facilities'>[]>();

  const { data: fetchFacilitiesData, error } = fetchFacilitiesQuery;
  return { data: fetchFacilitiesData, error };
};

