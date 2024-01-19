'use client';

import Link from 'next/link';
import { useQueryParam } from '@/hooks/useQueryParam';
import styles from './usedGoodsOrder.module.scss';

const UsedGoodsOrder = () => {
  const { isSoldout, generateQueryParameter } = useQueryParam();

  return (
    <div className={styles.wrapper}>
      {/* TBD: 최신순, 인기순 등 정렬 추가*/}
      <Link
        href={`${generateQueryParameter('available')}`}
        className={isSoldout ? undefined : styles.active}
      >
        판매중
      </Link>
      <span className={styles.divide}></span>
      <Link
        href={`${generateQueryParameter('soldout')}`}
        className={isSoldout ? styles.active : undefined}
      >
        판매완료
      </Link>
    </div>
  );
};

export default UsedGoodsOrder;
