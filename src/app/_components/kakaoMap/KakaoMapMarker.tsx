'use client';

import styles from './kakaoMapMarker.module.scss';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import { useAddress, usePosition } from '@/hooks/useKakaoMapMarker';
import { useToast } from '@/hooks/useToast';

type Props = {
  lat?: number;
  lng?: number;
  address?: string;
};

const KakaoMapMarker = (props: Props) => {
  const { errorTopRight } = useToast();

  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });

  const setPosition = usePosition((state) => state.setPosition);
  const setAddress = useAddress((state) => state.setAddress);

  const position = usePosition((state) => state.position);

  // 마커 클릭 시 해당위치 정보 저장
  const mapClickHandler = (_t: any, mouseEvent: any) => {
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    setPosition({ lat, lng });
    getAddress(lat, lng);
  };

  // 위도, 경도로 주소 정보 가져오기
  const getAddress = (lat: number, lng: number) => {
    const geocoder = new kakao.maps.services.Geocoder();

    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  // 현재위치를 시작점으로 만들기
  useEffect(() => {
    if (props.lat && props.lng) return;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          errorTopRight({ message: '위치 받기에 실패하였습니다' });
          setCurrentLocation({ latitude: 33.450701, longitude: 126.570667 });
        }
      );
    }
  }, []);

  // props로 받은 위치로 지도 이동
  useEffect(() => {
    if (props.lat && props.lng) {
      setPosition({ lat: props.lat, lng: props.lng });
      setCurrentLocation({ latitude: props.lat, longitude: props.lng });
    }
    if (props.address) {
      setAddress(props.address);
    }
  }, [props.lat, props.lng, props.address]);

  return (
    <div className={styles.container}>
      <div id="map" className={styles.mapWrap}>
        <Map
          center={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
          level={3}
          style={{ width: '100%', height: '100%', borderRadius: '15px' }}
          onClick={mapClickHandler}
        >
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
          {position && (
            <MapMarker
              position={position}
              image={{
                src: 'https://i.ibb.co/hLdk42x/dog-marker-removebg-preview.png',
                // 마커이미지의 크기
                size: {
                  width: 90,
                  height: 95
                },
                // 마커이미지의 옵션으로 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정할 수 있다
                options: {
                  offset: {
                    x: 45,
                    y: 70
                  }
                }
              }}
            ></MapMarker>
          )}
        </Map>
      </div>
    </div>
  );
};

export default KakaoMapMarker;
