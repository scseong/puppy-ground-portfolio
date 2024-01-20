'use client';

import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import styles from './usedGoodsList.module.scss';
import { useQueryParam } from '@/hooks/useQueryParam';
import { getQueryKey, getQueryFunction } from '@/apis/goods';

const UsedGoodsList = () => {
  const { isSoldout, queryObject } = useQueryParam();
  const { data } = useQuery({
    queryKey: getQueryKey(queryObject),
    queryFn: getQueryFunction(queryObject)
  });

  // TODO: Empty Component 만들기
  if (!data) return <div>상품이 없습니다.</div>;

  const ForSaleGoods = data.filter((goods) => !goods.sold_out);
  const SoldOutGoods = data.filter((goods) => goods.sold_out);

  if ((isSoldout && !SoldOutGoods.length) || (!isSoldout && !ForSaleGoods.length))
    return <div>상품이 없습니다.</div>;

  return (
    <div className={styles.wrapper}>
      {isSoldout && SoldOutGoods?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
      {!isSoldout && ForSaleGoods?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
    </div>
  );
};

export default UsedGoodsList;
