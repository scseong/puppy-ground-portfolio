'use client';

import style from './kakaoMapMarker.module.scss';
import Script from 'next/script';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`;

const KakaoMapMarker = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });
  const [position, setPosition] = useState<{ lat: number; lng: number }>();
  const [address, setAddress] = useState<string>('');

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
        console.log('결과', result);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
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
        },
        () => {
          console.log('위치 받기에 실패하였습니다');
          setCurrentLocation({ latitude: 33.450701, longitude: 126.570667 });
        }
      );
    }
  }, []);

  return (
    <div className={style.container}>
      <div id="map" className={style.mapWrap}>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <Map
          center={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
          level={3}
          style={{ width: '100%', height: '100%' }}
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
          {position && <p>{`위도 : ${position.lat} 경도 : ${position.lng}`}</p>}
        </Map>
      </div>
      <p className={style.searchAddress}>{address || '선택하신 위치의 주소입니다'}</p>
    </div>
  );
};

export default KakaoMapMarker;
