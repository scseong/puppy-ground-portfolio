import Image from 'next/image';
import React from 'react';
import loadingBar from '../../../../../public/images/loader.gif';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <Image src={loadingBar} className={styles.image} alt="loading" quality={30} priority />
    </div>
  );
};

export default Loading;
