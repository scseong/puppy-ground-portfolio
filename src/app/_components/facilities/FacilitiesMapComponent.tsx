'use client';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl
} from 'react-kakao-maps-sdk';
import styles from './facilitiesMapComponent.module.scss';
import { useFacilitiesQuery } from '@/hooks/useFacilitiesQuery';
import { useState } from 'react';

import NearFacilities from '@/app/_components/facilities/NearFacilities';
import CurrentLocationButton from './CurrentLocationButton';
import FacilitiesOverlay from './FacilitiesOverlay';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import useMapBounds from '@/hooks/useMapBounds';

const FacilitiesMapComponent = () => {
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const { facilitiesData } = useFacilitiesQuery();
  const { debouncedSetCoordinate, coordinate } = useMapBounds();
  const {
    showCurrentInfo,
    setCurrentLocation,
    setShowCurrentInfo,
    currentLocation,
    currentLocationMarker
  } = useCurrentLocation();

  // 장소이름 클릭 시 해당 마커로 이동
  const markerFocusHandler = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    setCurrentLocation({
      latitude,
      longitude
    });
    setShowCurrentInfo(false);
  };

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
                <FacilitiesOverlay place={place} activeMarkerId={activeMarkerId} />
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
      <NearFacilities markerFocusHandler={markerFocusHandler} coordinate={coordinate} />
      <CurrentLocationButton />
    </div>
  );
};

export default FacilitiesMapComponent;
