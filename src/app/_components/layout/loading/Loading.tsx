import React from 'react';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lds_default}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>퍼그가 정보를 불러오는 중입니다.</p>
    </div>
  );
};

export default Loading;
