import Image from 'next/image';
import style from './mainGrid.module.scss';
import dogImg from '../../../../public/images/welsh.png';
import toy from '../../../../public/images/toy.jpg';
import family from '../../../../public/images/family.jpg';
import mungstagram from '../../../../public/images/mungstagram.jpg';
import Link from 'next/link';

const MainGrid = () => {
  return (
    <div className={style.container}>
      <div className={style.firstContainer}>
        <div className={style.firstSection}>
          <div className={style.firstTextWrap}>
            <p>
              <span className={style.bold}>우리 동네</span>에서
            </p>
            <p>
              다양한 <span className={style.bold}>반려견 정보</span>를
            </p>
            <p>공유하고 거래하는</p>
          </div>
          <div className={style.firstImageWrap}>
            <Image src={dogImg} alt="image" width={800} height={800} className={style.image} />
          </div>
        </div>
      </div>
      <div className={style.secondSection}>
        <div className={style.secondTextWrap}>
          <span className={style.secondBold}>저희 퍼피그라운드는요</span>
          <p>우리 아이들이 사용하지 않는 제품을</p>
          <p>가까운 이웃과 손쉽게 거래할 수 있습니다</p>
          <Link href="/used-goods">
            <button className={style.button}>거래하러 가기</button>
          </Link>
        </div>
        <div className={style.secondImageWrap}>
          <Image src={toy} alt="image" width={600} height={600} className={style.image} />
        </div>
      </div>
      <div className={style.thirdSection}>
        <div className={style.thirdImageWrap}>
          <Image src={family} alt="image" width={1200} height={600} className={style.image} />
        </div>
      </div>
      <div className={style.thirdTextWrap}>
        <p>사지말고 입양하세요</p>
        <Link href="/stray-dogs">
          <button className={style.button}>입양하러 가기</button>
        </Link>
      </div>
      <div className={style.fourthSection}>
        <div className={style.fourthImageWrap}>
          <Image src={mungstagram} alt="image" width={800} height={600} className={style.image} />
        </div>
        <div className={style.fourthTextWrap}>
          <p>사랑스러운,</p>
          <span className={style.fourthBold}>우리 아이들을 자랑해봐요!</span>
          <Link href="/mungstagram">
            <button className={style.button}>자랑하러 가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainGrid;
