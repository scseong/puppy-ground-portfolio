'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getStrayList } from '@/apis/stray';
import { useParams } from 'next/navigation';
import { FaMapMarkerAlt, FaHandsHelping } from 'react-icons/fa';
import { PiGenderIntersexFill } from 'react-icons/pi';
import { FaDog, FaCakeCandles, FaUserDoctor, FaCalendarDays, FaSquarePhone } from 'react-icons/fa6';
import Loading from '@/app/_components/layout/loading/Loading';
import { IoMdColorPalette } from 'react-icons/io';
import { GiWeight } from 'react-icons/gi';
import { MdStickyNote2 } from 'react-icons/md';
import { BiSolidHomeHeart } from 'react-icons/bi';
import KakaoShareButton from '@/app/_components/shareButton/KakaoShareButton';
import ClipBoardButton from '@/app/_components/shareButton/ClipBoardButton';

const StrayDogsDetail = () => {
  const params = useParams();
  const { desertionNo } = params;

  const {
    isLoading,
    isError,
    data: strayList
  } = useQuery<StrayList[]>({
    queryKey: ['strayList'],
    queryFn: getStrayList
  });

  if (!desertionNo) {
    return <div>선택하신 공고의 정보를 찾지 못하였습니다</div>;
  }

  const strayDesertionNo = strayList?.find((list) => {
    return list.desertionNo === desertionNo;
  });

  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  const formatHappenDt = formatDate(strayDesertionNo?.happenDt!);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>🙇🏻‍♀️오류가 발생하였습니다🙇🏻‍♀️</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.firstSection}>
          <div className={styles.imageWrap}>
            <Image src={strayDesertionNo?.popfile!} alt="stray-dog" width={500} height={300} />
          </div>

          <div className={styles.dogExplanationWrap}>
            <div className={styles.titleColumn}>
              <p>
                <FaDog />
                &nbsp;견종
              </p>
              <p>
                <IoMdColorPalette />
                &nbsp;색상
              </p>
              <p>
                <FaCakeCandles />
                &nbsp;나이
              </p>
              <p>
                <GiWeight />
                &nbsp;몸무게
              </p>
              <p>
                <PiGenderIntersexFill />
                &nbsp;성별
              </p>
              <p>
                <FaUserDoctor />
                &nbsp;중성화여부
              </p>
            </div>
            <div className={styles.contentColumn}>
              <p>{strayDesertionNo?.kindCd.slice(3)}</p>
              <p>{strayDesertionNo?.colorCd}</p>
              <p>{strayDesertionNo?.age}</p>
              <p>{strayDesertionNo?.weight}</p>
              <p>{strayDesertionNo?.sexCd === 'M' ? '수컷' : '암컷'}</p>
              <p>
                {strayDesertionNo?.neuterYn === 'Y'
                  ? '중성화 O'
                  : strayDesertionNo?.neuterYn === 'N'
                    ? '중성화 X'
                    : '미상'}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.careExplanationWrap}>
          <div className={styles.titleColumn}>
            <p>
              <FaCalendarDays />
              &nbsp;접수번호
            </p>
            <p>
              <MdStickyNote2 />
              &nbsp;특이사항
            </p>
            <p>
              <FaHandsHelping />
              &nbsp;구조일시
            </p>
            <p>
              <FaMapMarkerAlt />
              &nbsp;구조장소
            </p>
            <p>
              <BiSolidHomeHeart />
              &nbsp;보호소 이름
            </p>
            <p>
              <FaSquarePhone />
              &nbsp;보호소 전화번호
            </p>
            <p>
              <FaMapMarkerAlt />
              &nbsp;보호소 위치
            </p>
          </div>
          <div className={styles.contentColumn}>
            <p>{strayDesertionNo?.noticeNo}</p>
            <p>{strayDesertionNo?.specialMark}</p>
            <p>{formatHappenDt}</p>
            <p>{strayDesertionNo?.happenPlace}</p>
            <p>{strayDesertionNo?.careNm}</p>
            <p>{strayDesertionNo?.careTel}</p>
            <p>{strayDesertionNo?.careAddr}</p>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <KakaoShareButton />
          <ClipBoardButton />
        </div>
      </div>
    </div>
  );
};

export default StrayDogsDetail;
