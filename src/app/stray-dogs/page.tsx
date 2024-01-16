'use client';

import { getStrayList } from '@/apis/stray';
import style from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { FaDog } from 'react-icons/fa6';

const StrayDogs = () => {
  const {
    isLoading,
    isError,
    data: strayList
  } = useQuery<StrayList[]>({
    queryKey: ['strayList'],
    queryFn: getStrayList,
    refetchOnWindowFocus: false,
    staleTime: 3000
  });
  console.log('🚀 ~ StrayDogs ~ data:', strayList);

  return (
    <div className={style.container}>
      <div className={style.filterWrap}>필터</div>
      <div className={style.gridContainer}>
        {strayList?.map((list, index) => {
          return (
            <div key={index} className={style.listContainer}>
              <div className={style.listCard}>
                <Image
                  src={list.popfile}
                  alt="dog-image"
                  className={style.image}
                  width={250}
                  height={250}
                />
                <div className={style.explanationWrap}>
                  <div className={style.titleColumn}>
                    <p className={style.title}>
                      <FaCalendarDays />
                      &nbsp;공고기간
                    </p>
                    <p className={style.title}>
                      <FaDog />
                      &nbsp;견종
                    </p>
                    <p className={style.title}>
                      <PiGenderIntersexFill />
                      &nbsp;성별
                    </p>
                    <p className={style.title}>
                      <FaMapMarkerAlt />
                      &nbsp;발견장소
                    </p>
                  </div>
                  <div className={style.contentColumn}>
                    <p>
                      {list.noticeSdt} - {list.noticeEdt}
                    </p>
                    <p>{list.kindCd.slice(3)}</p>
                    <p>{list.sexCd === 'M' ? '수컷' : '암컷'}</p>
                    <p>{list.happenPlace}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StrayDogs;
