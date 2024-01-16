import { Map, MapMarker } from 'react-kakao-maps-sdk';

const TradeLocationMap = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <Map
      center={{
        lat: 37.464567,
        lng: 127.538327
      }}
      style={{
        width: '100%',
        height: '450px',
        borderRadius: '15px'
      }}
      level={3}
    >
      <MapMarker
        position={{ lat, lng }}
        image={{
          src: 'https://i.ibb.co/hLdk42x/dog-marker-removebg-preview.png',
          size: {
            width: 90,
            height: 95
          },
          options: {
            offset: {
              x: 45,
              y: 70
            }
          }
        }}
      ></MapMarker>
    </Map>
  );
};

export default TradeLocationMap;
