import { fetchFacilities } from '@/apis/facilities';
import style from './nearFacilities.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Tables } from '@/shared/supabase/types/supabase';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiCalendarCloseFill } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { TbCategory } from 'react-icons/tb';

const NearFacilities = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchPlace, setSearchPlace] = useState('');
  const [showingData, setShowingData] = useState<Tables<'facilities'>[]>([]);
  const [filteredPlace, setFilteredPlace] = useState<Tables<'facilities'>[] | null>(null);
  const { data: facilitiesData } = useQuery({
    queryKey: ['facilitiesList'],
    queryFn: fetchFacilities
  });

  // 검색데이터가 변경될때마다 업데이트
  useEffect(() => {
    setFilteredPlace(facilitiesData?.data || null);
  }, [facilitiesData]);

  useEffect(() => {
    if (searchPlace !== '') setShowingData(filteredPlace ?? []);
    else setShowingData(props.facilitiesDataByCorrdinate && props.facilitiesDataByCorrdinate.data);
  }, [props.facilitiesDataByCorrdinate, filteredPlace]);

  const searchButtonHandler = () => {
    console.log(searchPlace.replace(/\s/g, '').toLowerCase());

    if (!facilitiesData?.data) return;

    const filteredData = facilitiesData.data.filter((place) => {
      return Object.values(place).some((value) =>
        value
          .toString()
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(searchPlace.replace(/\s/g, '').toLowerCase())
      );
    });
    setFilteredPlace(filteredData);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {isVisible ? (
        <button onClick={toggleVisibility} className={style.openButton}>
          열기
        </button>
      ) : (
        <div className={style.container}>
          <button onClick={toggleVisibility} className={style.closeButton}>
            ◀︎
          </button>
          <div className={style.listContainer}>
            <div className={style.searchWrap}>
              <input
                type="text"
                value={searchPlace}
                className={style.listInput}
                placeholder="검색어를 입력해주세요"
                onChange={(e) => setSearchPlace(e.target.value)}
              />
              <button onClick={searchButtonHandler} className={style.listButton}>
                🔎
              </button>
            </div>
            {showingData?.map((list) => {
              return (
                <div key={list.id} className={style.listWrap}>
                  <div className={style.list}>
                    <div
                      onClick={() =>
                        props.markerFocusHandler({
                          latitude: list.latitude,
                          longitude: list.longitude
                        })
                      }
                      className={style.listName}
                    >
                      {list.facilities_name}
                    </div>
                    <div className={style.listContent}>
                      <p className={style.listAddress}>
                        <FaMapMarkerAlt />
                        &nbsp;{list.address}
                      </p>
                      <p>
                        <TbCategory /> &nbsp;{list.explanation}
                      </p>
                      <div className={style.placeOpen}>
                        <p>
                          <RiCalendarCloseFill />
                          &nbsp;{list.holiday}
                        </p>
                        <p>
                          <FaRegClock />
                          &nbsp;{list.open_time}
                        </p>
                      </div>
                      <a href={list.url} target="_blank" rel="noreferrer">
                        <p className={style.link}>
                          바로가기 &nbsp;
                          <FaExternalLinkAlt />
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NearFacilities;
