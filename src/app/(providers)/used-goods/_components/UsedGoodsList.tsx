'use client';

import { useQuery } from '@tanstack/react-query';
import UsedGoodsItem from './UsedGoodsItem';
import styles from './usedGoodsList.module.scss';
import { useQueryParam } from '@/hooks/useQueryParam';
import { getQueryKey, getQueryFunction } from '@/apis/goods';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const UsedGoodsList = () => {
  const { queryObject, generateQueryParameter } = useQueryParam();
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();


  const { data: postList } = useQuery({
    queryKey: getQueryKey(queryObject),
    queryFn: getQueryFunction(queryObject)
  });

  const { data, count } = { ...postList };
  const itemsPerPage = 8;
  const pageNumbers = count ? Math.ceil(count / itemsPerPage) : 0;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const current = searchParams.get('page');
    if (!current) return setCurrentPage(1);
    setCurrentPage(Number(current));
  }, [searchParams]);

  return (
    <>

      <div className={styles.wrapper}>
        {data?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
      </div>
      {/* TODO: 페이지네이션 컴포넌트 분리*/}
      <div className={styles.pagination}>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((number, idx) => (
          <Link
            key={number}
            href={`${generateQueryParameter('page', number + '')}`}
            className={idx + 1 == currentPage ? styles.isActive : undefined}
          >
            <button onClick={() => handlePageChange(number)}>{number}</button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default UsedGoodsList;
