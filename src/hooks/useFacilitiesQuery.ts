import { fetchFacilities, fetchFacilitiesByCorrdinate } from '@/apis/facilities';
import { useQuery } from '@tanstack/react-query';

export const useFacilitiesQuery = (coordinate?: { sw: number[]; ne: number[] } | undefined) => {
  const { data: facilitiesData } = useQuery({
    queryKey: ['facilitiesList'],
    queryFn: fetchFacilities
  });

  const { data: facilitiesDataByCorrdinate } = useQuery({
    queryKey: ['facilitiesList', coordinate?.sw, coordinate?.ne],
    queryFn: () => fetchFacilitiesByCorrdinate(coordinate)
  });
  return { facilitiesData, facilitiesDataByCorrdinate };
};
