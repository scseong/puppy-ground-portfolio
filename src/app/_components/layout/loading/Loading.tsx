import React from 'react';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <video
        src="/images/loader.mp4"
        className={styles.image}
        width="350"
        height="350"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default Loading;
