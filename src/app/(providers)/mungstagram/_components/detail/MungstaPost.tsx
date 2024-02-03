'use client';

import { getMungstaPost, getComments } from '@/apis/mung-stagram/action';
import { useQuery } from '@tanstack/react-query';
import styles from './mungstaPost.module.scss';
import { useEffect, useState } from 'react';
import {
  GoComment,
  GoShare,
  GoHeart,
  GoHeartFill,
  GoChevronLeft,
  GoChevronRight
} from 'react-icons/go';
import Image from 'next/image';
import ImageSlider from '@/app/_components/lib/ImageSlider';
import { getStringFromNow } from '@/utils/time';
import CommentForm from '@/app/(providers)/@modal/_components/CommentForm';

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
          {photo_url.length > 1 && <ImageSlider images={photo_url} styles={customStyle} />}
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
              <button>
                <GoComment size="1.3rem" />
              </button>
              <button>
                <GoHeart size="1.3rem" />
              </button>
              <button>
                <GoShare size="1.3rem" />
              </button>
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
          {comments.map((comment) => {
            const { id, content, created_at, profiles } = comment;
            return (
              <div className={styles.comment} key={`${id}-${created_at}`}>
                <div className={styles.avatar}>
                  <Image src={profiles!.avatar_url!} width={45} height={45} alt="avatar" />
                </div>
                <div className={styles.detail}>
                  <span className={styles.username}>{profiles!.user_name}</span>
                  <p className={styles.content}>{content}</p>
                  <span className={styles.createdAt}>{getStringFromNow(created_at)}</span>
                </div>
              </div>
            );
          })}
          {!comments.length && <div className={styles.comment}>댓글이 없습니다.</div>}
        </div>
        <div className={styles.commentForm}>{mounted && <CommentForm />}</div>
      </section>
    </main>
  );
};

export default MungstaPost;
