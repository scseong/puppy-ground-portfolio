'use client';

import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import { getQueryFunction, getQueryKey } from '../page';
import { useSearchParams } from 'next/navigation';

const UsedGoodsList = () => {
  const router = useSearchParams();
  const paramsObj = Object.fromEntries(router);
  const { data } = useQuery({
    queryKey: getQueryKey(paramsObj),
    queryFn: getQueryFunction(paramsObj)
  });

  // TODO: Empty Component 만들기
  if (!data) return <div>상품이 없습니다.</div>;

  return <>{data?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}</>;
};

export default UsedGoodsList;
