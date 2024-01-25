'use client';

import { Main } from '@/app/_components/layout';
import Link from 'next/link';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import styles from './page.module.scss';
import { IoIosMore } from 'react-icons/io';
import { GoHeartFill, GoHeart } from 'react-icons/go';

const getPosts = async () => {
  const { data } = await supabase.from('mung_stagram').select('*');
  return data;
};

const Mungstagram = () => {
  // const { data } = useQuery({
  //   queryKey: ['mungstagram'],
  //   queryFn: getPosts
  // });

  return (
    <Main>
      <h2>멍스타그램</h2>
      <Link href="/mungstagram/create">등록하기</Link>
      <section className={styles.mungstagram}>
        <div className={styles.mungstaList}>
          <div className={styles.mungstaItem}>
            <Link href="/mungstagram/1">
              <div className={styles.profile}>
                <div>
                  <img src="https://placehold.co/40x40/orange/white" alt="avatar image" />
                  <span>UserName</span>
                </div>
                <div>
                  <IoIosMore />
                </div>
              </div>
              <div className={styles.images}>
                <img src="https://placehold.co/300x300/orange/white" alt="" />
                <span>
                  <GoHeart />
                </span>
              </div>
              <div className={styles.info}>
                <h3>제목제목</h3>
                <div>
                  <ul>
                    <li>#태그</li>
                    <li>#태그</li>
                    <li>#태그</li>
                    <li>#태그</li>
                  </ul>
                </div>
                <p>
                  설명설 명설
                  명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
                </p>
              </div>
            </Link>
          </div>
          <div className={styles.mungstaItem}>
            <Link href="/mungstagram/2">
              <div className={styles.profile}>
                <div>
                  <img src="https://placehold.co/40x40/orange/white" alt="avatar image" />
                  <span>UserName</span>
                </div>
                <div>
                  <IoIosMore />
                </div>
              </div>
              <div className={styles.images}>
                <img src="https://placehold.co/300x300/orange/white" alt="" />
                <span>
                  <GoHeart />
                </span>
              </div>
              <div className={styles.info}>
                <h3>제목제목</h3>
                <div>
                  <ul>
                    <li>#태그</li>
                    <li>#태그</li>
                    <li>#태그</li>
                    <li>#태그</li>
                  </ul>
                </div>
                <p>
                  설명설 명설
                  명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Mungstagram;
