'use client';

import { useEffect, Fragment } from 'react';
import { useInfinitePostData } from '@/hooks/useInfinitePosts';
import { useInView } from 'react-intersection-observer';
import MungstaPostCard from './MungstaPostCard';
import styles from './page.module.scss';

const MungstaPostsInfinite = () => {
  const { ref, inView } = useInView();
  const { data, error, fetchNextPage, isFetchingNextPage } = useInfinitePostData();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return null;

  return (
    <>
      <div className={styles.mungstaList}>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((post: any) => (
              <MungstaPostCard key={post.id} post={post} />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} />
    </>
  );
};

export default MungstaPostsInfinite;
