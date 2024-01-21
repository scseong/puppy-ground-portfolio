'use client';

import { getStrayList } from '@/apis/stray';
import style from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import { useState } from 'react';
import Loading from '@/app/_components/layout/loading/Loading';
import regionList from '../../../data/regionList.json';
import { IoSearch } from 'react-icons/io5';

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
      <div className={style.contentContainer}>
        <div className={style.filterWrap}>
          <div className={style.filterContent}>
            <p>기간</p>
            <div className={style.calender}>
              <DatePicker
                className={style.datePicker}
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                minDate={new Date('2023-10-01')} // minDate 이전 날짜 선택 불가
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
          </div>
          <div className={style.filterContent}>
            <p>지역</p>
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
            <button>
              <IoSearch />
            </button>
          </div>
        </div>
        <div className={style.gridContainer}>
          {strayList?.map((list, index) => {
            const formatHappenDt = formatDate(list.happenDt);
            return (
              <div key={index}>
                <div className={style.listCard}>
                  <Link href={`/stray-dogs/${list.desertionNo}`}>
                    <div className={style.imageWrap}>
                      <Image
                        src={list.popfile}
                        alt="dog-image"
                        className={style.image}
                        width={250}
                        height={250}
                      />
                    </div>
                  </Link>
                  <div className={style.explanationWrap}>
                    <div className={style.titleColumn}>
                      <p>구조일시</p>
                      <p>견종</p>
                      <p>성별</p>
                      <p>발견장소</p>
                    </div>
                    <div className={style.contentColumn}>
                      <p>{formatHappenDt}</p>
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
    </div>
  );
};

export default StrayDogs;
