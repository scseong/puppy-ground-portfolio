import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';

const useCurrentLocation = () => {
  const { warnTopCenter } = useToast();

  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });
  const [currentLocationMarker, setCurrentLocationMarker] = useState<boolean>(false);
  const [showCurrentInfo, setShowCurrentInfo] = useState<boolean>(true);

  // 현재위치로 가는 버튼
  const currentButtonHandler = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setCurrentLocationMarker(true);
          setShowCurrentInfo(true);
        },
        () => {
          warnTopCenter({ message: '현재 위치를 찾지 못하였습니다 🥲' });
          setCurrentLocationMarker(false);
        }
      );
    }
  };

  // 현재위치를 시작점으로 만들기
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setCurrentLocationMarker(true);
        },
        () => {
          setCurrentLocation({ latitude: 33.450701, longitude: 126.570667 });
        }
      );
    }
  }, []);

  return {
    currentLocation,
    setCurrentLocation,
    currentLocationMarker,
    showCurrentInfo,
    setShowCurrentInfo,
    currentButtonHandler
  };
};

export default useCurrentLocation;
