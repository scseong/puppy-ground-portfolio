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
      <h2>중고물품 리스트</h2>
      <div className={styles.filtering}>
        <UsedGoodsFilter />
        <UsedGoodsSearch />
      </div>
      {/* TODO: 등록하기 버튼 */}
      <div className={styles.subFiltering}>
        <UsedGoodsOrder />
        <Link href="/used-goods/create" className={styles.createLink}>
          등록하기
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* TODO: 한 줄에 게시글 4개씩 */}
        <UsedGoodsList />
      </HydrationBoundary>
    </main>
  );
};

export default UsedGoodsContainer;
