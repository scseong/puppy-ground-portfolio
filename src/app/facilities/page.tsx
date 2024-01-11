'use client';

import { useQuery } from '@tanstack/react-query';
import style from './page.module.scss';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { fetchFacilities } from '@/apis/facilities';
import Loading from '../_components/layout/loading/Loading';

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`;

const Facilities = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });

  const {
    isLoading,
    isError,
    data: fetchFacilitiesData
  } = useQuery({
    queryKey: ['facilitiesList'],
    queryFn: fetchFacilities
  });
  // 현재위치를 시작점으로 만들기
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          console.log('위치 받기에 실패하였습니다');
          setCurrentLocation({ latitude: 33.450701, longitude: 126.570667 });
        }
      );
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>🙇🏻‍♀️ 리스트를 불러오지 못했습니다 🙇🏻‍♀️</h2>;
  }

  return (
    <div className={style.container}>
      <div id="map" className={style.mapWrap}>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <Map
          center={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
          level={3}
          style={{ width: '100%', height: '100%' }}
        >
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
          <MapMarker
            position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
          ></MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default Facilities;

