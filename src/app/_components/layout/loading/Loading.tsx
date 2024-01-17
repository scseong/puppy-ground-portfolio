import Image from 'next/image';
import React from 'react';
import loadingBar from '../../../../../public/images/image_processing20210911-6827-1lzc0fb-ezgif.com-effects.gif';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <Image src={loadingBar} className={styles.image} alt="loading" />
      <p>퍼그가 정보를 가져오고 있습니다</p>
    </div>
  );
};

export default Loading;

