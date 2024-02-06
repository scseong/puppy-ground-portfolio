import { useState } from 'react';

export const useCityAndGu = () => {
  const [selectCity, setSelectCity] = useState('');
  const [selectGu, setSelectGu] = useState('');

  const cityChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCity(event.target.value);
    setSelectGu(''); // 도시가 변경될 때 구 선택을 초기화
  };

  const guChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectGu(event.target.value);
  };

  return {
    selectCity,
    setSelectCity,
    selectGu,
    setSelectGu,
    cityChangeHandler,
    guChangeHandler
  };
};
