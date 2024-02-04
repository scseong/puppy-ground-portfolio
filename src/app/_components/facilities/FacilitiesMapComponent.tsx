'use client';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl
} from 'react-kakao-maps-sdk';
import styles from './facilitiesMapComponent.module.scss';
import { GiSittingDog } from 'react-icons/gi';
import { RiCalendarCloseFill } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa';
import { useFacilitiesQuery } from '@/hooks/useFacilitiesQuery';
import useDebounce from '@/hooks/useDebounce';

type FacilitiesMapComponentProps = {
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  setCoordinate: React.Dispatch<
    React.SetStateAction<{
      sw: number[];
      ne: number[];
    }>
  >;
  setActiveMarkerId: React.Dispatch<React.SetStateAction<number | null>>;
  activeMarkerId: number | null;
  currentLocationMarker: boolean;
  showCurrentInfo: boolean;
};

const FacilitiesMapComponent: React.FC<FacilitiesMapComponentProps> = ({
  currentLocation,
  setCoordinate,
  setActiveMarkerId,
  activeMarkerId,
  currentLocationMarker,
  showCurrentInfo
}) => {
  const { facilitiesData } = useFacilitiesQuery();

  // onBoundsChanged시 화면 이동 할때마다 데이터를 계속 받아와서 느려짐 -> 디바운싱 이용
  const debouncedSetCoordinate = useDebounce((map) => {
    setCoordinate({
      sw: map.getBounds().getSouthWest().toString().replace(/\(|\)/g, '').split(',').map(Number),
      ne: map.getBounds().getNorthEast().toString().replace(/\(|\)/g, '').split(',').map(Number)
    });
  }, 1000);

  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.mapWrap}>
        <Map
          center={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
          level={3}
          style={{ width: '100%', height: '100%' }}
          onBoundsChanged={(map) => debouncedSetCoordinate(map)}
        >
          {facilitiesData?.data?.map((place) => {
            return (
              <div key={place.id}>
                <MapMarker
                  position={{ lat: place.latitude, lng: place.longitude }}
                  onMouseOver={() => setActiveMarkerId(place.id)}
                  onMouseOut={() => setActiveMarkerId(null)}
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
                    <div className={styles.overlayWrap}>
                      <div className={styles.placeName}>{place.facilities_name}</div>
                      <div className={styles.placeContent}>
                        <p>
                          <GiSittingDog />
                          &nbsp;{place.explanation}
                        </p>
                        <p>
                          <RiCalendarCloseFill />
                          &nbsp;{place.holiday}
                        </p>
                        <p>
                          <FaRegClock />
                          &nbsp;{place.open_time}
                        </p>
                      </div>
                    </div>
                  </CustomOverlayMap>
                )}
              </div>
            );
          })}
          {currentLocationMarker && (
            <>
              <MapMarker
                position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
                image={{
                  // 마커이미지의 주소
                  src: 'https://i.ibb.co/DYzyv2q/pngegg.png',
                  size: {
                    width: 20,
                    height: 20
                  }
                }}
              />
              {showCurrentInfo && (
                <CustomOverlayMap
                  position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }}
                >
                  <div className={styles.infoWindow}>
                    <p>현재위치</p>
                  </div>
                </CustomOverlayMap>
              )}
            </>
          )}
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
        </Map>
      </div>
    </div>
  );
};

export default FacilitiesMapComponent;
