'use client';

import { getStrayList } from '@/apis/stray';
import style from './page.module.scss';
import { useQuery } from '@tanstack/react-query';

const StrayDogs = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['strayList'],
    queryFn: getStrayList
    // refetchOnWindowFocus: false,
    // staleTime: 3000
  });
  console.log('🚀 ~ StrayDogs ~ data:', data);

  return (
    <div className={style.container}>
      <div className={style.filterWrap}>필터</div>
      <div className={style.gridContainer}>
        <div className={style.listContainer}>
          <div className={style.listCard}>
            <div className={style.image}>이미지</div>
            <div className={style.explanationWrap}>
              <div className={style.explanationColumn}>
                <p className={style.title}>공고기간</p>
                <p>0000.00.00-00.00</p>
              </div>
              <div className={style.explanationColumn}>
                <p className={style.title}>견종</p>
                <p>포메라니언</p>
              </div>
              <div className={style.explanationColumn}>
                <p className={style.title}>성별</p>
                <p>암컷</p>
              </div>
              <div className={style.explanationColumn}>
                <p className={style.title}>발견장소</p>
                <p>경기도 의정부 000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrayDogs;
