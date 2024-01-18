'use client';

import Link from 'next/link';
import { useQueryParam } from '@/hooks/useQueryParam';

const UsedGoodsOrder = () => {
  const { generateQueryParameter } = useQueryParam();

  return (
    <div>
      <Link href={`${generateQueryParameter('available')}`}>판매중</Link>
      <Link href={`${generateQueryParameter('soldout')}`}>판매 완료</Link>
    </div>
  );
};

export default UsedGoodsOrder;
