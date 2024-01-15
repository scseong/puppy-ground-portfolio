import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';

// 동반시설 데이터 가져오기
export const fetchFacilities = async () => {
  const fetchFacilitiesQuery = await supabase
    .from('facilities')
    .select('*')
    .returns<Tables<'facilities'>[]>();

  const { data: facilitiesData, error } = fetchFacilitiesQuery;
  return { data: facilitiesData, error };
};

// 현재 지도 안의 데이터만 불러오기
// sw: 남서쪽 ne: 북동쪽
export const fetchFacilitiesByCorrdinate = async (
  coordinate: { sw: number[]; ne: number[] } | undefined
) => {
  const fetchFacilitiesQuery = await supabase
    .from('facilities')
    .select('*')
    .gte('latitude', coordinate?.sw[0] ?? 0) // greater than equals
    .lte('latitude', coordinate?.ne[0] ?? 0) // less than equals
    .gte('longitude', coordinate?.sw[1] ?? 0)
    .lte('longitude', coordinate?.ne[1] ?? 0)
    .returns<Tables<'facilities'>[]>();

  const { data: facilitiesDataByCorrdinate, error } = fetchFacilitiesQuery;
  return { data: facilitiesDataByCorrdinate, error };
};
