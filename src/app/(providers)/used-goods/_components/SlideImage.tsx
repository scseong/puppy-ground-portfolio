'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { GoDot, GoDotFill, GoChevronLeft, GoChevronRight } from 'react-icons/go';
import cn from 'classnames/bind';
import styles from './slideImage.module.scss';

const cx = cn.bind(styles);

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    };
  }
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const SlideImage = ({ images, sizes }: { images: string[]; sizes?: React.CSSProperties }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className={styles.wrapper} style={sizes}>
      <MotionConfig transition={{ duration: 0.4 }}>
        {/* <motion.div> */}
        <AnimatePresence initial={false} custom={direction}>
          {images.length > 1 && (
            <motion.img
              key={page}
              src={images[imageIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              style={sizes}
            />
          )}
          {images.length === 1 && (
            <motion.img
              key={imageIndex}
              src={images[imageIndex]}
              alt={images[imageIndex]}
              style={sizes}
            />
          )}
        </AnimatePresence>
        {/* </motion.div> */}
        {images.length > 1 && (
          <>
            <motion.div className={cx('directionBtn', 'leftBtn')} onClick={() => paginate(-1)}>
              <GoChevronLeft size="2.4rem" />
            </motion.div>
            <motion.div className={cx('directionBtn', 'rightBtn')} onClick={() => paginate(1)}>
              <GoChevronRight size="2.4rem" />
            </motion.div>
            <div className={styles.indicator}>
              {images.map((_, idx) => (
                <motion.div key={idx} onClick={() => setPage([idx, 0])}>
                  {imageIndex === idx ? <GoDotFill  /> : <GoDot />}
                </motion.div>
              ))}
            </div>
          </>
        )}
      </MotionConfig>
    </div>
  );
};

export default SlideImage;
