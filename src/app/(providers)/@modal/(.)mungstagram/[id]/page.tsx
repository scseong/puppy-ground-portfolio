'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactModal from 'react-modal';
import { GoShare, GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getPrevAndNextPost } from '@/apis/mung-stagram/action';
import KakaoShareButton from '@/app/_components/shareButton/KakaoShareButton';
import { customStyle } from '@/shared/modal';
import { CommentList, CommentForm, LikeButton } from '../../_components';
import styles from './page.module.scss';

const ImageSlider = dynamic(() => import('@/app/_components/lib/ImageSlider'), {
  ssr: false
});

type PageProps = {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const MungModal = ({ params }: PageProps) => {
  const [isOpen, setOpen] = useState(true);
  const router = useRouter();
  const { id } = params;

  const { data: post, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPosts(id)
  });

  const { data: prevAndNextPostId, isLoading } = useQuery({
    queryKey: ['nextPost', id],
    queryFn: () => getPrevAndNextPost(id)
  });

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    document.body.setAttribute('style', 'overflow: hidden');
  }, []);

  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
    return () => {
      setOpen(false);
      document.body.setAttribute('style', 'overflow: auto');
    };
  }, [isOpen, router]);

  if (!post) return;
  if (isLoading) return;
  const { prev, next } = prevAndNextPostId ?? {};

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      style={customStyle}
      ariaHideApp={false}
      // preventScroll
    >
      <section className={styles.mungstaDetail}>
        {next && (
          <Link className={styles.nextLink} href={`/mungstagram/${next}`} replace scroll={false}>
            <GoChevronRight size="2.8rem" />
          </Link>
        )}
        {prev && (
          <Link className={styles.prevLink} href={`/mungstagram/${prev}`} replace scroll={false}>
            <GoChevronLeft size="2.8rem" />
          </Link>
        )}
        <div className={styles.title}>{post.title}</div>
        <div className={styles.images}>
          <ImageSlider images={post.photo_url} width={600} height={450} />
        </div>
        <div className={styles.detail}>
          <div className={styles.icons}>
            <LikeButton mungStargramId={params.id} title={post.title} />
            {/* <div>
              <GoComment />
            </div> */}
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
      </section>
    </ReactModal>
  );
};

export default MungModal;
