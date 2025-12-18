import { Metadata } from 'next';
import { UsedGoodsList, UsedGoodsFilter, UsedGoodsOrder, UsedGoodsSearch } from './_components';
import { getQueryFunction, SearchParams } from '@/apis/goods';
import styles from './page.module.scss';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '반려견 중고 물품 거래 | Puppy Ground',
  description:
    '반려견 의류, 장난감, 간식 등 다양한 중고 반려용품을 한눈에! 우리 동네 반려인들과 신뢰할 수 있는 직거래로 반려 생활의 부담을 덜어보세요.',
  openGraph: {
    title: '반려견 중고 물품 거래 | Puppy Ground',
    description:
      '반려견 의류, 장난감, 간식 등 다양한 중고 반려용품을 한눈에! 우리 동네 반려인들과 신뢰할 수 있는 직거래로 반려 생활의 부담을 덜어보세요.'
  }
};

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
