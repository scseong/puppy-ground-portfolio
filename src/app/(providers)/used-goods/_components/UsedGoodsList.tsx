'use client';

import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import { SearchParams, getQueryFunction, getQueryKey } from '../page';
import { useSearchParams } from 'next/navigation';
import { handleSearch } from '../actions';

const UsedGoodsList = () => {
  const router = useSearchParams();
  const params: SearchParams = Object.fromEntries(router);
  const { data } = useQuery({
    queryKey: getQueryKey(params),
    queryFn: getQueryFunction(params)
  });

  // TODO: Empty Component 만들기
  if (!data) return <div>상품이 없습니다.</div>;

  return (
    <>
      <form action={handleSearch}>
        <input type="text" name="query" />
        <button>검색</button>
      </form>

      {data?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
    </>
  );
};

export default UsedGoodsList;
