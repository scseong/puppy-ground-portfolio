import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

const useMapBounds = () => {
  const [coordinate, setCoordinate] = useState<{ sw: number[]; ne: number[] }>({
    sw: [33.44653220300056, 126.56202403813722],
    ne: [33.45501290255946, 126.57927700861282]
  });

  const debouncedSetCoordinate = useDebounce((map) => {
    setCoordinate({
      sw: map.getBounds().getSouthWest().toString().replace(/\(|\)/g, '').split(',').map(Number),
      ne: map.getBounds().getNorthEast().toString().replace(/\(|\)/g, '').split(',').map(Number)
    });
  }, 1000);

  return { debouncedSetCoordinate, coordinate };
};

export default useMapBounds;
