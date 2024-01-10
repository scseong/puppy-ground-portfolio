'use client';

import { useState } from 'react';
import KakaoMap from './KakaoMap';

const KakaoMapMarker = () => {
  const [searchLocation, setSearchLocation] = useState<string>('');

  const locationChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchLocation(event.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={searchLocation}
        onChange={locationChangeHandler}
        placeholder="위치를 검색해주세요"
      />
      <button>🔎</button>
      <KakaoMap />
    </div>
  );
};

export default KakaoMapMarker;

