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
import dayjs from 'dayjs';
import { Main } from '@/app/_components/layout';
import kakaotalk from './../../../../../public/images/kakaoLogo.png';

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

  const happenDt = dayjs(strayDesertionNo?.happenDt).format('YYYY[년] MM[월] DD[일]');

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>🙇🏻‍♀️오류가 발생하였습니다🙇🏻‍♀️</div>;
  }

  return (
    <Main>
      <div className={styles.contentContainer}>
        <div className={styles.firstSection}>
          <div className={styles.imageWrap}>
            <Image src={strayDesertionNo?.popfile1!} alt="stray-dog" width={500} height={300} />
          </div>
          <div className={styles.dogExplanationWrap}>
            <div className={styles.textWrapper}>
              <h3>
                <FaDog />
                &nbsp;견종
              </h3>
              <p>{strayDesertionNo?.kindCd.slice(3)}</p>
              <h3>
                <IoMdColorPalette />
                &nbsp;색상
              </h3>
              <p>{strayDesertionNo?.colorCd}</p>
              <h3>
                <FaCakeCandles />
                &nbsp;나이
              </h3>
              <p>{strayDesertionNo?.age}</p>
              <h3>
                <GiWeight />
                &nbsp;몸무게
              </h3>
              <p>{strayDesertionNo?.weight}</p>
              <h3>
                <PiGenderIntersexFill />
                &nbsp;성별
              </h3>
              <p>{strayDesertionNo?.sexCd === 'M' ? '수컷' : '암컷'}</p>
              <h3>
                <FaUserDoctor />
                &nbsp;중성화여부
              </h3>
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
          <div className={styles.textWrapper}>
            <h3>
              <FaCalendarDays />
              &nbsp;접수번호
            </h3>
            <p>{strayDesertionNo?.noticeNo}</p>
            <h3>
              <MdStickyNote2 />
              &nbsp;특이사항
            </h3>
            <p>{strayDesertionNo?.specialMark}</p>
            <h3>
              <FaHandsHelping />
              &nbsp;구조일시
            </h3>
            <p>{happenDt}</p>
            <h3>
              <FaMapMarkerAlt />
              &nbsp;구조장소
            </h3>
            <p>{strayDesertionNo?.happenPlace}</p>
            <h3>
              <BiSolidHomeHeart />
              &nbsp;보호소 이름
            </h3>
            <p>{strayDesertionNo?.careNm}</p>
            <h3>
              <FaSquarePhone />
              &nbsp;보호소 전화번호
            </h3>
            <p>{strayDesertionNo?.careTel}</p>
            <h3>
              <FaMapMarkerAlt />
              &nbsp;보호소 위치
            </h3>
            <p>{strayDesertionNo?.careAddr}</p>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <KakaoShareButton>
            <button className={styles.kakaoButton}>
              <Image src={kakaotalk} alt="kakaotalk" width={45} height={45} />
            </button>
          </KakaoShareButton>
          <ClipBoardButton />
        </div>
      </div>
    </Main>
  );
};

export default StrayDogsDetail;
