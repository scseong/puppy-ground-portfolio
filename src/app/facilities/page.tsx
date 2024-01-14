'use client';

import { useQuery } from '@tanstack/react-query';
import style from './page.module.scss';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl
} from 'react-kakao-maps-sdk';
import { fetchFacilitiesByCorrdinate, fetchFacilities } from '@/apis/facilities';
import { IoIosCloseCircle } from 'react-icons/io';
import { RiHomeSmile2Fill } from 'react-icons/ri';
import { MdMyLocation } from 'react-icons/md';
import { GiSittingDog } from 'react-icons/gi';
import { useToast } from '@/hooks/useToast';
import NearFacilities from '../_components/facilities/NearFacilities';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`;

const Facilities = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 33.450701,
    longitude: 126.570667
  });

  // TODO: 기본값으로 보여줄 위치 넣어야 함 {sw: [11,22], ne: [22,33]}
  // TODO: any 타입 지우기
  // TODO: 컴포넌트화
  // TODO: 쿼리 불러오는거 커스텀훅 만들기
  const [coordinate, setCoordinate] = useState<{ sw: number[]; ne: number[] }>();
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState<boolean>(false);
  const { data: facilitiesData } = useQuery({
    queryKey: ['facilitiesList'],
    queryFn: fetchFacilities
  });
  // map 이동 debouncing을 위한 timer 생성
  // https://velog.io/@sanghyeon/React-useRef
  const timer = useRef<number | null>(null);

  const { data: facilitiesDataByCorrdinate } = useQuery({
    queryKey: ['facilitiesList', coordinate?.sw, coordinate?.ne],
    queryFn: () => fetchFacilitiesByCorrdinate(coordinate)
  });

  console.log('데이터', facilitiesData);

  const { warnTopCenter } = useToast();

  const currentButtonHandler = () => {
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
          console.log('현재위치를 찾는데 실패하였습니다');
          warnTopCenter({ message: '현재 위치를 찾지 못하였습니다 🥲', timeout: 2000 });
          setCurrentLocationMarker(false);
        }
      );
    }
  };

  const markerFocusHandler = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    setCurrentLocation({
      latitude,
      longitude
    });
    console.log('🚀 ~ markerFocusHandler ~ latitude:', latitude);
  };

  const markerClickHandler = () => {
    setActiveMarkerId(null);
  };

  useEffect(() => {
    console.log('🚀 ~ Facilities ~ coordinate:', coordinate);
  }, [coordinate]);

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
          console.log('위치 받기에 실패하였습니다');
          setCurrentLocation({ latitude: 33.450701, longitude: 126.570667 });
        }
      );
    }
  }, []);
  // onBoundsChanged시 화면 이동 할때마다 데이터를 계속 받아와서 느려짐 -> 디바운싱 이용
  return (
    <div className={style.mapContainer}>
      <div id="map" className={style.mapWrap}>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <Map
          center={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
          level={3}
          style={{ width: '100%', height: '100%' }}
          onBoundsChanged={(map) => {
            // 디바운싱 구현
            if (timer.current) {
              clearTimeout(timer.current);
            }

            timer.current = window.setTimeout(() => {
              setCoordinate({
                sw: map
                  .getBounds()
                  .getSouthWest()
                  .toString()
                  .replace(/\(|\)/g, '')
                  .split(',')
                  .map(Number),
                ne: map
                  .getBounds()
                  .getNorthEast()
                  .toString()
                  .replace(/\(|\)/g, '')
                  .split(',')
                  .map(Number)
              });
            }, 1000);
          }}
        >
          {facilitiesData?.data!.map((place) => {
            return (
              <div key={place.id}>
                <MapMarker
                  position={{ lat: place.latitude, lng: place.longitude }}
                  onClick={() => setActiveMarkerId(place.id)}
                  image={{
                    // 마커이미지의 주소
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
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
                        <div className={style.close} onClick={markerClickHandler} title="닫기">
                          <IoIosCloseCircle />
                        </div>
                      </div>
                      <div className={style.placeContent}>
                        {/* <p className={style.address}>{place.address}</p> */}
                        {/* <div className={style.placeOpen}>
                          <p>휴무: {place.holiday}</p>
                          <p>영업시간: {place.open_time}</p>
                        </div> */}
                        <p>
                          <GiSittingDog />
                          &nbsp;{place.explanation}
                        </p>
                        <a href={place.url} target="_blank" rel="noreferrer">
                          <p className={style.link}>
                            <RiHomeSmile2Fill />
                            &nbsp;홈페이지
                          </p>
                        </a>
                      </div>
                    </div>
                  </CustomOverlayMap>
                )}
              </div>
            );
          })}
          {currentLocationMarker && (
            <MapMarker
              position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
            />
          )}
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
        </Map>
        <NearFacilities
          markerFocusHandler={markerFocusHandler}
          facilitiesDataByCorrdinate={facilitiesDataByCorrdinate}
        />
        <button className={style.currentLocation} onClick={currentButtonHandler}>
          <MdMyLocation />
        </button>
      </div>
    </div>
  );
};

export default Facilities;
