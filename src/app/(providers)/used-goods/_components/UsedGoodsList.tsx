'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import { getQueryFunction, getQueryKey } from '../page';
import styles from './usedGoodsList.module.scss';
import { useQueryParam } from '@/hooks/useQueryParam';

const UsedGoodsList = () => {
  const { isSoldout, queryObject } = useQueryParam();
  const { data } = useQuery({
    queryKey: getQueryKey(queryObject),
    queryFn: getQueryFunction(queryObject)
  });

  // TODO: Empty Component 만들기
  if (!data) return <div>상품이 없습니다.</div>;

  const filtedGoods = data.filter((goods) => goods.sold_out === isSoldout);

  return (
    <div className={styles.wrapper}>
      {filtedGoods?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
    </div>
  );
};

export default UsedGoodsList;
