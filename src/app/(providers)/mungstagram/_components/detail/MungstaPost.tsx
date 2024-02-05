'use client';

import { getMungstaPost, getComments } from '@/apis/mung-stagram/action';
import { useQuery } from '@tanstack/react-query';
import styles from './mungstaPost.module.scss';
import { useEffect, useState } from 'react';
import { GoShare, GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Image from 'next/image';
import ImageSlider from '@/app/_components/lib/ImageSlider';
import CommentForm from '@/app/(providers)/@modal/_components/CommentForm';
import { CommentList, LikeButton } from '@/app/(providers)/@modal/_components';
import KakaoShareButton from '@/app/_components/shareButton/KakaoShareButton';

const MungstaPost = ({ postId }: { postId: string }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ['munstagram', postId],
    queryFn: () => getMungstaPost(postId)
  });

  const { data: comments, error } = useQuery({
    queryKey: ['mung_stagram_comments', postId],
    queryFn: () => {
      return getComments(Number(postId));
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!data || !comments) return;

  const { title, content, created_at, id, mung_stagram_like, photo_url, tags } = data;
  const { avatar_url, user_name } = data?.profiles ?? {};

  const customStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    aspectRatio: '6 / 5'
  };

  return (
    <main className={styles.main}>
      <section className={styles.mungsta}>
        <header className={styles.header}>
          <div>
            {avatar_url && <Image src={avatar_url} alt="avatar iamge" width={40} height={40} />}
            <span>{user_name}</span>
          </div>
        </header>
        <div className={styles.images}>
          {photo_url.length > 1 && (
            <ImageSlider images={photo_url} styles={customStyle} width={500} height={500} />
          )}
          {photo_url.length === 1 && (
            <Image
              src={photo_url[0]}
              alt="image"
              style={{ ...customStyle }}
              draggable={false}
              width={500}
              height={500}
            />
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.top}>
            <div className={styles.icons}>
              <LikeButton mungStargramId={postId} title={title} />
              <KakaoShareButton>
                <GoShare />
              </KakaoShareButton>
            </div>
            <div className={styles.hashtags}>
              {tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.postInfo}>
            <span>{title}</span>
            <p>{content}</p>
          </div>
        </div>
      </section>
      <section className={styles.comments}>
        <div className={styles.header}>
          <span>댓글</span>
        </div>
        <div className={styles.commentList}>
          {mounted && <CommentList />}
          {!comments.length && <div className={styles.comment}>댓글이 없습니다.</div>}
        </div>
        <div className={styles.commentForm}>{mounted && <CommentForm />}</div>
      </section>
    </main>
  );
};

export default MungstaPost;
