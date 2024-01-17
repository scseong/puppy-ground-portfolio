'use client';

import { getStrayList } from '@/apis/stray';
import style from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { FaDog } from 'react-icons/fa6';
import Link from 'next/link';
import { useState } from 'react';
import Loading from '@/app/_components/layout/loading/Loading';
import regionList from '../../../data/regionList.json';

const StrayDogs = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectCity, setSelectCity] = useState('');
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

  const cityChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCity(event.target.value);
  };

  const selectRegion = regionList.find((region) => region.city === selectCity);
  const guList = selectRegion ? selectRegion.gu : [];

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
      <div className={style.filterWrap}>
        <p>
          <FaCalendarDays />
          &nbsp;기간
        </p>
        <div className={style.calender}>
          <DatePicker
            className={style.datePicker}
            dateFormat="yyyy-MM-dd"
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={new Date('2023-01-01')} // minDate 이전 날짜 선택 불가
            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            className={style.datePicker}
            dateFormat="yyyy-MM-dd"
            shouldCloseOnSelect
            selected={endDate}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <p>
          <FaMapMarkerAlt />
          &nbsp;지역
        </p>
        <select name="지역" className={style.selectCity} onChange={cityChangeHandler}>
          {regionList.map((region, index) => {
            return <option key={index}>{region.city}</option>;
          })}
        </select>
        <select name="시/군/구" className={style.selectCity}>
          {guList?.map((gu, index) => {
            return <option key={index}>{gu}</option>;
          })}
        </select>
      </div>
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
