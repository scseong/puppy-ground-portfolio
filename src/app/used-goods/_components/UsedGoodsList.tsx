'use client';

import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import { getUsedGoods } from '../page';

const UsedGoodsList = () => {
  const { data } = useQuery({ queryKey: ['used-goods'], queryFn: getUsedGoods });

  if (!data) return <div>상품이 없습니다.</div>;

  return <>{data?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}</>;
};

export default UsedGoodsList;
