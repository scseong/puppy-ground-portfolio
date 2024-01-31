import style from './nearFacilities.module.scss';
import { useEffect, useState } from 'react';
import { Tables } from '@/shared/supabase/types/supabase';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiCalendarCloseFill } from 'react-icons/ri';
import { FaRegClock } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { TbCategory } from 'react-icons/tb';
import { useFacilitiesQuery } from '@/hooks/useFacilitiesQuery';

type NearFacilitiesProps = {
  markerFocusHandler: ({ latitude, longitude }: { latitude: number; longitude: number }) => void;
  coordinate: { sw: number[]; ne: number[] };
};
const NearFacilities: React.FC<NearFacilitiesProps> = ({ markerFocusHandler, coordinate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchPlace, setSearchPlace] = useState('');
  const [showingData, setShowingData] = useState<Tables<'facilities'>[]>([]);
  const [filteredPlace, setFilteredPlace] = useState<Tables<'facilities'>[] | null>(null);
  const [serchPerformed, setSearchPerformed] = useState(false);

  const { facilitiesData, facilitiesDataByCorrdinate } = useFacilitiesQuery(coordinate);

  // 검색데이터가 변경될때마다 업데이트
  useEffect(() => {
    setFilteredPlace(facilitiesData?.data || null);
  }, [facilitiesData]);

  useEffect(() => {
    if (searchPlace !== '') setShowingData(filteredPlace ?? []);
    else setShowingData(facilitiesDataByCorrdinate ? facilitiesDataByCorrdinate?.data! : []);
  }, [facilitiesDataByCorrdinate, filteredPlace]);

  // 리스트 검색버튼
  const searchButtonHandler = () => {
    setSearchPerformed(true);
    if (!facilitiesData?.data) return;

    const filteredData = facilitiesData.data.filter((place) => {
      return Object.values(place).some((value) =>
        value
          .toString()
          // 공백을 제거해주는 정규표현식
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(searchPlace.replace(/\s/g, '').toLowerCase())
      );
    });
    setFilteredPlace(filteredData);
  };

  // 엔터키로 검색처리
  const enterKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchPerformed(true);
      searchButtonHandler();
    }
  };

  // 리스트 열고 닫기 버튼
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {isVisible ? (
        <button onClick={toggleVisibility} className={style.openButton}>
          ▶︎
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
                onKeyDown={enterKeyHandler}
              />
              <button onClick={() => setSearchPlace('')}>X</button>
              <p>|</p>
              <button onClick={searchButtonHandler}>🔎</button>
            </div>
            {showingData.length === 0 && searchPlace !== '' && serchPerformed ? (
              <p className={style.noResult}>🥲 검색결과가 없습니다 🥲</p>
            ) : (
              showingData?.map((list) => {
                return (
                  <div key={list.id} className={style.listWrap}>
                    <div className={style.list}>
                      <div
                        onClick={() =>
                          markerFocusHandler({
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
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NearFacilities;
