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
import Pagination from '@/app/_components/pagination/Pagination';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';

const StrayDogs = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date('2023-10-01'));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectCity, setSelectCity] = useState('');
  const [selectGu, setSelectGu] = useState('');
  const [page, setPage] = useState(1);
  const limit = 16;
  const offset = (page - 1) * limit;

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
    setSelectGu(''); // 도시가 변경될 때 구 선택을 초기화
  };
  const guChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectGu(event.target.value);
  };
  const [filteredStrayList, setFilteredStrayList] = useState<StrayList[] | undefined>();
  const selectRegion = regionList.find((region) => region.city === selectCity);
  const guList = selectRegion ? selectRegion.gu : [];

  const filterList = () => {
    const filteredCity =
      selectCity === '전지역'
        ? strayList
        : strayList?.filter((item) => item.orgNm.includes(selectCity));
    const filteredGu =
      selectGu === '전체'
        ? filteredCity
        : filteredCity?.filter((item) => item.orgNm.includes(selectGu));

    console.log('123');

    const filteredDate = filteredGu?.filter((item) => {
      const startDayjs = dayjs(startDate).format('YYYYMMDD');
      const endDayjs = dayjs(endDate).format('YYYYMMDD');
      console.log('456');

      if (item.noticeEdt >= startDayjs && item.noticeEdt <= endDayjs) {
        return true;
      }
    });
    setFilteredStrayList(filteredDate);
    setPage(1);
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
                locale={ko}
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
                locale={ko}
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                selected={endDate}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date('2025-01-01')} // maxDate 이후 날짜 선택 불가
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
            <select
              name="시/군/구"
              className={style.selectCity}
              onChange={guChangeHandler}
              value={selectGu}
            >
              {guList?.map((gu, index) => {
                return <option key={index}>{gu}</option>;
              })}
            </select>
            <button onClick={filterList}>
              <IoSearch />
            </button>
          </div>
        </div>
        <div className={style.gridContainer}>
          {filteredStrayList
            ? filteredStrayList.slice(offset, offset + limit).map((list, index) => {
                const formatHappenDt = dayjs(list.happenDt).format('YYYY[년] MM[월] DD[일]');
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
              })
            : strayList?.slice(offset, offset + limit).map((list, index) => {
                const formatHappenDt = dayjs(list.happenDt).format('YYYY[년] MM[월] DD[일]');
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
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          total={filteredStrayList ? filteredStrayList.length : strayList?.length}
        />
      </div>
    </div>
  );
};

export default StrayDogs;
