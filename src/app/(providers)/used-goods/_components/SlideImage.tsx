'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { GoDot, GoDotFill, GoChevronLeft, GoChevronRight } from 'react-icons/go';
import cn from 'classnames/bind';
import styles from './slideImage.module.scss';

const cx = cn.bind(styles);

const SlideImage = ({ images }: { images: string[] }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const onPrevClick = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };
  const onNextClick = () => {
    if (currentIdx < images.length - 1) setCurrentIdx((prev) => prev + 1);
  };

  const onDotClick = (idx: number) => setCurrentIdx(idx);

  const slideVariants = {
    visible: {
      opacity: 0
    },
    exit: {
      opacity: 1
    }
  };

  return (
    // TODO: layout shift issue
    <div className={styles.wrapper}>
      <MotionConfig transition={{ duration: 0.6 }}>
        <motion.div>
          <AnimatePresence>
            <motion.img
              key={currentIdx}
              src={images[currentIdx]}
              alt={images[currentIdx]}
              variants={slideVariants}
              initial="visible"
              animate="exit"
              style={{ width: '400px', height: '400px' }}
            />
          </AnimatePresence>
        </motion.div>
        <motion.div className={cx('directionBtn', 'leftBtn')} onClick={onPrevClick}>
          <GoChevronLeft size="2rem" />
        </motion.div>
        <motion.div className={cx('directionBtn', 'rightBtn')} onClick={onNextClick}>
          <GoChevronRight size="2rem" />
        </motion.div>
        <div className={styles.indicator}>
          {images.map((_, idx) => (
            <motion.div key={idx} onClick={() => setCurrentIdx(idx)}>
              {currentIdx === idx ? <GoDotFill /> : <GoDot />}
            </motion.div>
          ))}
        </div>
      </MotionConfig>
    </div>
  );
};

export default SlideImage;
