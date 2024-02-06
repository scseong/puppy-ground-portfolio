import { MdMyLocation } from 'react-icons/md';
import styles from './currentLocationButton.module.scss';
import useCurrentLocation from '@/hooks/useCurrentLocation';

const CurrentLocationButton = () => {
  const { currentButtonHandler } = useCurrentLocation();
  return (
    <div>
      <button className={styles.currentLocation} onClick={currentButtonHandler}>
        <MdMyLocation />
      </button>
    </div>
  );
};

export default CurrentLocationButton;
