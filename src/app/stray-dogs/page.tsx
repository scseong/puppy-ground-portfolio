'use client';

import { getStrayList } from '@/apis/stray';
import style from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { FaDog } from 'react-icons/fa6';
import Loading from '../_components/layout/loading/Loading';
import Link from 'next/link';

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

  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>🙇🏻‍♀️오류가 발생하였습니다🙇🏻‍♀️</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.filterWrap}>필터</div>
      <div className={style.gridContainer}>
        {strayList?.map((list, index) => {
          const formatNoticeEdt = formatDate(list.noticeEdt);
          return (
            <div key={index} className={style.listContainer}>
              <Link href={`/stray-dogs/${list.desertionNo}`}>
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
                      <p>
                        <FaCalendarDays />
                        &nbsp;공고기간
                      </p>
                      <p>
                        <FaDog />
                        &nbsp;견종
                      </p>
                      <p>
                        <PiGenderIntersexFill />
                        &nbsp;성별
                      </p>
                      <p>
                        <FaMapMarkerAlt />
                        &nbsp;발견장소
                      </p>
                    </div>
                    <div className={style.contentColumn}>
                      <p>{formatNoticeEdt} 까지</p>
                      <p>{list.kindCd.slice(3)}</p>
                      <p>{list.sexCd === 'M' ? '수컷' : '암컷'}</p>
                      <p>{list.happenPlace}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StrayDogs;
