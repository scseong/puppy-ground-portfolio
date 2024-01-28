'use client';
import Card from './Card';
import styles from './list.module.scss';
import useAuth from '@/hooks/useAuth';
import { getUsedGoodWish } from '@/apis/wishLike/actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getRegisteredUsedGoods } from '@/apis/used-goods/actions';

enum Tab {
  wish = 'wish',
  registered = 'registered',
  used = 'used',
  mungstagram = 'mungstagram'
}

const List = () => {
  const user = useAuth((state) => state.user);
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.wish);
  const [selectedTitle, setSelectedTitle] = useState<Tab>(Tab.used);

  const { data: wishedData } = useQuery({
    queryKey: ['wish-list'],
    queryFn: () => {
      if (!user) return;
      return getUsedGoodWish(user!.id);
    },
    select: (res) => res?.map((value) => value.used_item),
    gcTime: 0
  });

  const { data: registeredData } = useQuery({
    queryKey: ['used_item'],
    queryFn: () => getRegisteredUsedGoods(user!.id),
    enabled: !!user && selectedTab === Tab.registered
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>마이페이지</h2>
      </div>
      <div className={styles.titleTab}>
        <button
          className={selectedTitle === Tab.used ? styles.selectedTitle : undefined}
          onClick={() => setSelectedTitle(Tab.used)}
        >
          중고물품
        </button>
        <button
          className={selectedTitle === Tab.mungstagram ? styles.selectedTitle : undefined}
          onClick={() => setSelectedTitle(Tab.mungstagram)}
        >
          멍스타그램
        </button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.space}>
        <div></div>
        <div className={styles.tab}>
          <button
            className={selectedTab === Tab.wish ? styles.selected : undefined}
            onClick={() => setSelectedTab(Tab.wish)}
          >
            관심상품
          </button>
          <button
            className={selectedTab === Tab.registered ? styles.selected : undefined}
            onClick={() => setSelectedTab(Tab.registered)}
          >
            등록한 상품
          </button>
        </div>
        <div>
          <button className={styles.alarm}>알림 설정</button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
          {selectedTab === Tab.wish
            ? wishedData?.map((goods) =>
                goods ? <Card key={goods.id} goods={goods} /> : undefined
              )
            : registeredData?.map((goods) =>
                goods ? <Card key={goods.id} goods={goods} /> : undefined
              )}
        </div>
      </div>
    </div>
  );
};

export default List;
