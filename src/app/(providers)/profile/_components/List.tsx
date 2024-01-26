'use client';
import Card from './Card';
import styles from './list.module.scss';
import useAuth from '@/hooks/useAuth';
import { getUsedGoodWish } from '@/apis/wishLike/actions';
import { useQuery } from '@tanstack/react-query';

const List = () => {
  const user = useAuth((state) => state.user);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['wish-list'],
    queryFn: () => getUsedGoodWish(user!.id),
    enabled: !!user,
    select: (res) => res?.map((value) => value.used_item)
  });

  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>마이페이지</h2>
        <button>알림 설정</button>
      </div>
      <div className={styles.tab}>
        <button>관심상품</button>
        <button>등록한 상품</button>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
          {data?.map((goods) => (goods ? <Card key={goods.id} goods={goods} /> : undefined))}
        </div>
      </div>
    </div>
  );
};

export default List;
