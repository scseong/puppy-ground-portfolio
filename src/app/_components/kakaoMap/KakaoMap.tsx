import style from './kakaoMap.module.scss';
import Script from 'next/script';
import { Map, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`;

const KakaoMap = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });

  // 현재위치를 시작점으로 만들기
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          console.log('위치 받기 실패하였습니다');
          setLocation({ latitude: 33.450701, longitude: 126.570667 });
        }
      );
    }
  }, []);

  return (
    <div className={style['container']}>
      <div id="map" className={style['map-wrap']}>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <Map
          // center={{ lat: 33.450701, lng: 126.570667 }}
          center={{ lat: location.latitude, lng: location.longitude }}
          level={3}
          style={{ width: '100%', height: '100%' }}
        >
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
        </Map>
      </div>
    </div>
  );
};

export default KakaoMap;

