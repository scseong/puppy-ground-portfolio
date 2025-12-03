import { UsedGoodsList, UsedGoodsFilter, UsedGoodsOrder, UsedGoodsSearch } from './_components';
import { getQueryFunction, SearchParams } from '@/apis/goods';
import styles from './page.module.scss';
import Link from 'next/link';

export const revalidate = 0;

const UsedGoodsContainer = async ({ searchParams }: { searchParams: SearchParams }) => {
  const queryFn = getQueryFunction(searchParams);
  const goodsData = await queryFn(); // 서버에서 바로 데이터 가져오기

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h2>중고물품 목록</h2>
        <Link href="/used-goods/create" className={styles.createLink}>
          등록하기
        </Link>
      </div>
      <div className={styles.filtering}>
        <UsedGoodsFilter initialSearchParams={searchParams} />
        <UsedGoodsSearch />
      </div>
      <div className={styles.subFiltering}>
        <UsedGoodsOrder />
      </div>
      <UsedGoodsList postList={goodsData} />
    </main>
  );
};

export default UsedGoodsContainer;
