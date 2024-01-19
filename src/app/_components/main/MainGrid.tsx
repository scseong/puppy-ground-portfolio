'use client';

import Image from 'next/image';
import style from './mainGrid.module.scss';
import dogImg from '../../../../public/images/welsh.png';
import toy from '../../../../public/images/toy.jpg';
import family from '../../../../public/images/family.jpg';
import mungstagram from '../../../../public/images/mungstagram.jpg';
import walk from '../../../../public/images/walk.jpg';
import hotel from '../../../../public/images/hotel.jpg';
import restaurant from '../../../../public/images/restaurant.jpg';
import travel from '../../../../public/images/travel.jpg';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MainGrid = () => {
  return (
    <div className={style.container}>
      <motion.div
        className={style.firstContainer}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
          x: { duration: 1 }
        }}
      >
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
      </motion.div>
      <div className={style.secondSection}>
        <motion.div
          className={style.secondTextWrap}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            x: { duration: 1 }
          }}
        >
          <span className={style.secondBold}>저희 퍼피그라운드는요</span>
          <p>우리 아이들이 사용하지 않는 제품을</p>
          <p>가까운 이웃과 손쉽게 거래할 수 있습니다</p>
          <Link href="/used-goods">
            <motion.button
              className={style.button}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              거래하러 가기
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          className={style.secondImageWrap}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1
          }}
        >
          <Image src={toy} alt="image" width={600} height={600} className={style.image} />
        </motion.div>
      </div>
      <div className={style.thirdSection}>
        <div className={style.thirdImageWrap}>
          <Image src={family} alt="image" width={1200} height={600} className={style.image} />
        </div>
        <div className={style.thirdTextWrap}>
          <motion.p
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: 'easeInOut',
              duration: 1,
              y: { duration: 1 }
            }}
          >
            사지말고 입양하세요
          </motion.p>
          <Link href="/stray-dogs">
            <motion.button
              className={style.button}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              입양하러 가기
            </motion.button>
          </Link>
        </div>
      </div>
      <div className={style.fourthSection}>
        <motion.div
          className={style.fourthImageWrap}
          whileInView={{ opacity: [0, 1], scale: [0.6, 1.1, 1] }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1
          }}
        >
          <Image src={mungstagram} alt="image" width={800} height={600} className={style.image} />
        </motion.div>
        <motion.div
          className={style.fourthTextWrap}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            y: { duration: 1 }
          }}
        >
          <p>사랑스러운,</p>
          <span className={style.fourthBold}>우리 아이들을 자랑해봐요!</span>
          <Link href="/mungstagram">
            <motion.button
              className={style.button}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              자랑하러 가기
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <motion.div
        className={style.fifthContainer}
        whileInView={{ opacity: [0, 1], scale: [0.6, 1.1, 1] }}
        viewport={{ once: false }}
        transition={{
          ease: 'easeInOut',
          duration: 1
        }}
      >
        <div className={style.fifthSection}>
          <div className={style.fifthTextWrap}>
            <p>
              아이들과 <span className={style.bold}>함께 여행을</span> 떠나볼까요?
            </p>
            <Link href="/facilities">
              <motion.button
                className={style.button}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                동반여행 가기
              </motion.button>
            </Link>
          </div>
          <div className={style.fifthImageGrid}>
            <div className={style.fifthImageWrap}>
              <div className={style.fifthImage}>
                <Image src={walk} alt="image" width={400} height={400} className={style.image} />
                <Image src={hotel} alt="image" width={400} height={400} className={style.image} />
                <Image
                  src={restaurant}
                  alt="image"
                  width={400}
                  height={400}
                  className={style.image}
                />
                <Image src={travel} alt="image" width={400} height={400} className={style.image} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainGrid;
