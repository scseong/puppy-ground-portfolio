'use client';

import { useEffect, Fragment } from 'react';
import { useInfinitePostData } from '@/hooks/useInfinitePosts';
import { useInView } from 'react-intersection-observer';
import MungstaPostCard from '@/app/(providers)/mungstagram/_components/root/MungstaPostCard';
import styles from './page.module.scss';

const MungstaPosts = () => {
  const { ref, inView } = useInView();
  const { data, error, fetchNextPage } = useInfinitePostData();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (error) return null;

  return (
    <>
      <div className={styles.mungstaList}>
        {data?.pages?.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.map((post: any) => (
              <MungstaPostCard post={post} key={post.id} />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref}></div>
    </>
  );
};

export default MungstaPosts;
