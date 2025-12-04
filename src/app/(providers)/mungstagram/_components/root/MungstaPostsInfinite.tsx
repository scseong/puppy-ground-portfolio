'use client';

import { useEffect, Fragment } from 'react';
import { useInfinitePostData } from '@/hooks/useInfinitePosts';
import { useInView } from 'react-intersection-observer';
import MungstaPostList from '@/app/(providers)/mungstagram/_components/root/MungstaPostList';

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
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          <MungstaPostList posts={page} />
        </Fragment>
      ))}
      <div ref={ref} />
    </>
  );
};

export default MungstaPostsInfinite;
