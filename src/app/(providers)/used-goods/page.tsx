import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { UsedGoodsList, UsedGoodsFilter, UsedGoodsOrder, UsedGoodsSearch } from './_components';
import { getQueryKey, getQueryFunction, SearchParams } from '@/apis/goods';
import styles from './page.module.scss';
import Link from 'next/link';

export const revalidate = 0;

const UsedGoodsContainer = async ({ searchParams }: { searchParams: SearchParams }) => {
  const [queryKey, queryFn] = [getQueryKey(searchParams), getQueryFunction(searchParams)];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h2>중고물품 목록</h2>
        <Link href="/used-goods/create" className={styles.createLink}>
          등록하기
        </Link>
      </div>
      <div className={styles.filtering}>
        <UsedGoodsFilter />
        <UsedGoodsSearch />
      </div>
      <div className={styles.subFiltering}>
        <UsedGoodsOrder />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsedGoodsList />
      </HydrationBoundary>
    </main>
  );
};

export default UsedGoodsContainer;
