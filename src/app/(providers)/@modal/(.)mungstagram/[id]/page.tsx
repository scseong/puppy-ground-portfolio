'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactModal from 'react-modal';
import { GoShare, GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getPrevAndNextPost } from '@/apis/mung-stagram/action';
import KakaoShareButton from '@/app/_components/shareButton/KakaoShareButton';
import { customStyle } from '@/shared/modal';
import { CommentList, CommentForm, LikeButton } from '../../_components';
import styles from './page.module.scss';
import useScrollLock from '@/hooks/useScrollLock';

const ImageSlider = dynamic(() => import('@/app/_components/lib/ImageSlider'), {
  ssr: false
});

type PageProps = {
  params: { [slug: string]: string };
};

const MungModal = ({ params }: PageProps) => {
  const [isOpen, setOpen] = useState(true);
  const router = useRouter();
  const { id } = params;

  const { data: post, isFetching } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPosts(id),
    placeholderData: (prevData) => prevData,
    staleTime: 1000 * 60
  });

  const { data: prevAndNextPostId } = useQuery({
    queryKey: ['nextPost', id],
    queryFn: () => getPrevAndNextPost(id)
  });
  const { prev, next } = prevAndNextPostId ?? {};

  useScrollLock();

  const closeModal = () => {
    setOpen(false);
    router.back();
  };

  const handleNavigate = (newId: string | number) => {
    router.replace(`/mungstagram/${newId}`, { scroll: false });
  };

  useEffect(() => {
    if (prev) router.prefetch(`/mungstagram/${prev}`);
    if (next) router.prefetch(`/mungstagram/${next}`);
  }, [prev, next, router]);

  if (!post && !isFetching) return null;

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      style={customStyle}
      ariaHideApp={false}
    >
      <section className={styles.mungstaDetail}>
        {next && (
          <button
            className={styles.prevLink}
            onClick={() => handleNavigate(next)}
            onMouseEnter={() => router.prefetch(`/mungstagram/${next}`)}
          >
            <GoChevronLeft size="2.8rem" />
          </button>
        )}
        {prev && (
          <button
            className={styles.nextLink}
            onClick={() => handleNavigate(prev)}
            onMouseEnter={() => router.prefetch(`/mungstagram/${prev}`)}
          >
            <GoChevronRight size="2.8rem" />
          </button>
        )}
        {post && (
          <>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.images}>
              <ImageSlider images={post.photo_url} width={600} height={450} />
            </div>
            <div className={styles.detail}>
              <div className={styles.icons}>
                <LikeButton mungStargramId={id} title={post.title} />
                <KakaoShareButton>
                  <GoShare />
                </KakaoShareButton>
              </div>
              <div className={styles.tags}>
                <ul>
                  {post.tags.map((tag, idx) => (
                    <li key={`${tag}-${idx}`}>#{tag}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.contents}>
                <p>
                  <span className={styles.username}>{post.profiles!.user_name}</span> {post.content}
                </p>
              </div>
              <div className={styles.comments}>
                <h3>댓글</h3>
                <CommentForm />
                <CommentList />
              </div>
            </div>
          </>
        )}
      </section>
    </ReactModal>
  );
};

export default MungModal;
