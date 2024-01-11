'use client';

import { useQuery } from '@tanstack/react-query';
import style from './page.module.scss';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl
} from 'react-kakao-maps-sdk';
import { fetchFacilities } from '@/apis/facilities';
import { IoIosCloseCircle } from 'react-icons/io';
import { RiHomeSmile2Fill } from 'react-icons/ri';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`;

const Facilities = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const { data: fetchFacilitiesData } = useQuery({
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

  return (
    <div id="map" className={style.mapWrap}>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
        level={3}
        style={{ width: '100%', height: '100%' }}
      >
        {fetchFacilitiesData?.data!.map((place) => {
          return (
            <div key={place.id}>
              <MapMarker
                position={{ lat: place.latitude, lng: place.longitude }}
                onClick={() => setActiveMarkerId(place.id)}
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35
                  }
                }}
              />
              {activeMarkerId === place.id && (
                <CustomOverlayMap
                  position={{ lat: place.latitude, lng: place.longitude }}
                  yAnchor={1}
                >
                  <div className={style.overlayWrap}>
                    <div className={style.placeName}>
                      {place.facilities_name}
                      <div
                        className={style.close}
                        onClick={() => setActiveMarkerId(null)}
                        title="닫기"
                      >
                        <IoIosCloseCircle />
                      </div>
                    </div>
                    <div className={style.placeContent}>
                      <p className={style.address}>{place.address}</p>
                      <div className={style.placeOpen}>
                        <p>휴무: {place.holiday}</p>
                        <p>영업시간: {place.open_time}</p>
                      </div>
                      <p className={style.etc}>특징: {place.explanation}</p>
                      <a href={place.url} target="_blank" rel="noreferrer">
                        <p className={style.link}>
                          바로가기
                          <RiHomeSmile2Fill />
                        </p>
                      </a>
                    </div>
                  </div>
                </CustomOverlayMap>
              )}
            </div>
          );
        })}
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl position={'RIGHT'} />
      </Map>
    </div>
  );
};

export default Facilities;
