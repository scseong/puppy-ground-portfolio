'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { MdMyLocation } from 'react-icons/md';
import { useToast } from '@/hooks/useToast';
import NearFacilities from '@/app/_components/facilities/NearFacilities';
import FacilitiesMapComponent from '@/app/_components/facilities/FacilitiesMapComponent';

const Facilities = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });

  const [coordinate, setCoordinate] = useState<{ sw: number[]; ne: number[] }>({
    sw: [33.44653220300056, 126.56202403813722],
    ne: [33.45501290255946, 126.57927700861282]
  });
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState<boolean>(false);
  const [showCurrentInfo, setShowCurrentInfo] = useState<boolean>(true);
  const { warnTopCenter } = useToast();

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

  // 장소이름 클릭 시 해당 마커로 이동
  const markerFocusHandler = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    setCurrentLocation({
      latitude,
      longitude
    });
    setShowCurrentInfo(false);
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

  return (
    <div className={styles.mapContainer}>
      <FacilitiesMapComponent
        currentLocation={currentLocation}
        setCoordinate={setCoordinate}
        setActiveMarkerId={setActiveMarkerId}
        activeMarkerId={activeMarkerId}
        currentLocationMarker={currentLocationMarker}
        showCurrentInfo={showCurrentInfo}
      />
      <NearFacilities markerFocusHandler={markerFocusHandler} coordinate={coordinate} />
      <button className={styles.currentLocation} onClick={currentButtonHandler}>
        <MdMyLocation />
      </button>
    </div>
  );
};

export default Facilities;
