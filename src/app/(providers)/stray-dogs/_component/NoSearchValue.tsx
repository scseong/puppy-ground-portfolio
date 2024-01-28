import Image from 'next/image';
import React from 'react';
import sadPuppy from '../../../../../public/images/sadpugtext.png';
import styles from '../_component/noSearchValue.module.scss';

function NoSearchValue() {
  return (
    <div className={styles.container}>
      <Image className={styles.img} src={sadPuppy} alt="해당지역에는 공고가 없습니다." />
    </div>
  );
}

export default NoSearchValue;
