'use client';
import Card from './Card';
import styles from './list.module.scss';
import useAuth from '@/hooks/useAuth';
import { getMungStagramLike, getUsedGoodWish } from '@/apis/wishLike/actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getRegisteredUsedGoods } from '@/apis/used-goods/actions';
import { getMungstaPostsByUserId } from '@/apis/mung-stagram/action';
import MungstaCard from './MungstaCard';

export type wishGood = {
  id: number;
  created_at: string;
  title: string;
  price: number;
  address: string;
  sold_out: boolean;
  photo_url: string[];
  used_item_wish: object;
  chat_list: object;
};

export type likePost = {
  id: number;
  title: string;
  photo_url: string[];
  content: string;
  tags: string[];
  profiles: {
    avatar_url: string | null;
    user_name: string;
  } | null;
};

enum Tab {
  wish = 'wish',
  registered = 'registered',
  used = 'used',
  mungstagram = 'mungstagram',
  like = 'like',
  registeredMungstagram = 'registeredMungstagram'
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
    select: (res) => {
      const usedItems: wishGood[] = [];
      res?.forEach((value) => {
        if (value.used_item) usedItems.push(value.used_item);
      });
      return usedItems;
    },
    gcTime: 0
  });

  const { data: registeredData } = useQuery({
    queryKey: ['used_item'],
    queryFn: () => getRegisteredUsedGoods(user!.id),
    gcTime: 0
  });

  const { data: likedMungstagram } = useQuery({
    queryKey: ['like-mungstagram'],
    queryFn: () => {
      if (!user) return;
      return getMungStagramLike(user!.id);
    },
    select: (res) => {
      const likedPosts: likePost[] = [];
      res?.forEach((value) => {
        if (value.mung_stagram) likedPosts.push(value.mung_stagram);
      });
      return likedPosts;
    },
    gcTime: 0
  });

  const { data: registeredMungstagram } = useQuery({
    queryKey: ['registered-mungstagram'],
    queryFn: () => getMungstaPostsByUserId(user!.id),
    select: (res) => {
      return res;
    },
    gcTime: 0
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>마이페이지</h2>
      </div>
      <div className={styles.titleTab}>
        <button
          className={selectedTitle === Tab.used ? styles.selectedTitle : undefined}
          onClick={() => {
            setSelectedTitle(Tab.used);
            setSelectedTab(Tab.wish);
          }}
        >
          중고물품
        </button>
        <button
          className={selectedTitle === Tab.mungstagram ? styles.selectedTitle : undefined}
          onClick={() => {
            setSelectedTitle(Tab.mungstagram);
            setSelectedTab(Tab.like);
          }}
        >
          멍스타그램
        </button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.space}>
        <div></div>
        {selectedTitle === Tab.used ? (
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
        ) : (
          <div className={styles.tab}>
            <button
              className={selectedTab === Tab.like ? styles.selected : undefined}
              onClick={() => setSelectedTab(Tab.like)}
            >
              좋아요
            </button>
            <button
              className={selectedTab === Tab.registeredMungstagram ? styles.selected : undefined}
              onClick={() => setSelectedTab(Tab.registeredMungstagram)}
            >
              등록한 게시물
            </button>
          </div>
        )}
        <div>
          <button className={styles.alarm}>알림 설정</button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {selectedTitle === Tab.used ? (
          <div className={styles.cardWrapper}>
            {(selectedTab === Tab.wish ? wishedData : registeredData)?.map((goods) => (
              <Card key={goods.id} goods={goods} />
            ))}
          </div>
        ) : (
          <div className={styles.cardWrapper}>
            {(selectedTab === Tab.like ? likedMungstagram : registeredMungstagram)?.map((posts) => (
              <MungstaCard key={posts.id} posts={posts} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
