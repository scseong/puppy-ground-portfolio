import Image from 'next/image';
import React from 'react';
import sadPuppy from '../../../../../public/images/sadpugtext.webp';
import styles from '../_component/noSearchValue.module.scss';
import { Main } from '@/app/_components/layout';

function NoSearchValue() {
  return (
    <Main>
      <div className={styles.container}>
        <Image
          className={styles.img}
          src={sadPuppy}
          width={1000}
          height={700}
          alt="해당지역에는 공고가 없습니다."
        />
      </div>
    </Main>
  );
}

export default NoSearchValue;
