'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import { SearchParams, getQueryFunction, getQueryKey } from '../page';
import { useSearchParams } from 'next/navigation';
import { handleSearch } from '../actions';

const UsedGoodsList = () => {
  const [isSoldOut, setSoldOut] = useState(false);
  const router = useSearchParams();
  const params: SearchParams = Object.fromEntries(router);
  const { data } = useQuery({
    queryKey: getQueryKey(params),
    queryFn: getQueryFunction(params)
  });

  // TODO: Empty Component 만들기
  if (!data) return <div>상품이 없습니다.</div>;

  const filtedGoods = data.filter((goods) => goods.sold_out === isSoldOut);

  const handleSoldOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    if (name === 'soldout') return setSoldOut(true);
    setSoldOut(false);
  };

  return (
    <>
      <form action={handleSearch}>
        <input type="text" name="query" />
        <button>검색</button>
      </form>
      <button name="avaliable" onClick={handleSoldOut}>
        판매중
      </button>
      <button name="soldout" onClick={handleSoldOut}>
        판매 완료
      </button>

      {filtedGoods?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
    </>
  );
};

export default UsedGoodsList;
