'use client';

import { Main } from '@/app/_components/layout';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import styles from './page.module.scss';
import { IoIosMore } from 'react-icons/io';
import { GoHeartFill, GoHeart } from 'react-icons/go';

const getPosts = async () => {
  const { data } = await supabase
    .from('mung_stagram')
    .select('*, profiles (user_name, avatar_url)');
  return data;
};

const Mungstagram = () => {
  const { data: posts } = useQuery({
    queryKey: ['mungstagram'],
    queryFn: getPosts
  });

  return (
    <Main>
      <h2>멍스타그램</h2>
      <Link href="/mungstagram/create">등록하기</Link>
      <section className={styles.mungstagram}>
        <div className={styles.mungstaList}>
          {posts &&
            posts.map((post) => {
              return (
                <div className={styles.mungstaItem} key={post.id}>
                  <Link href={`/mungstagram/${post.id}`}>
                    <div className={styles.profile}>
                      <div>
                        <Image
                          src={`${post.profiles!.avatar_url}`}
                          alt="avatar image"
                          width="30"
                          height="30"
                          priority
                        />
                        <span>{post.profiles!.user_name}</span>
                      </div>
                      <div>
                        <IoIosMore />
                      </div>
                    </div>
                    <div className={styles.images}>
                      <Image
                        src={`${post.photo_url[0]}`}
                        alt=""
                        width="270"
                        height="270"
                        priority
                      />
                      <span>
                        <GoHeart />
                      </span>
                    </div>
                    <div className={styles.info}>
                      <h3>제목제목</h3>
                      <div>
                        <ul>{post.tags && post.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
                      </div>
                      <p>{post.content}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </section>
    </Main>
  );
};

export default Mungstagram;
