import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styles from './facilitiesOverlay.module.scss';
import { GiSittingDog } from 'react-icons/gi';
import { RiCalendarCloseFill } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa';

type Place = {
  address: string;
  category: string;
  county: string;
  explanation: string;
  facilities_name: string;
  holiday: string;
  id: number;
  latitude: number;
  longitude: number;
  open_time: string;
  url: string;
};

type FacilitiesOverlayProps = {
  activeMarkerId: number | null;
  place: Place;
};

const FacilitiesOverlay: React.FC<FacilitiesOverlayProps> = ({ place, activeMarkerId }) => {
  return (
    <div>
      {activeMarkerId === place.id && (
        <CustomOverlayMap position={{ lat: place.latitude, lng: place.longitude }} yAnchor={1}>
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
};

export default FacilitiesOverlay;
