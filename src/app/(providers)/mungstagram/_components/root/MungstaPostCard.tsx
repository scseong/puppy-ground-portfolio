'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Database } from '@/shared/supabase/types/supabase';
import styles from './mungstaPostCard.module.scss';

type Post = Database['public']['Tables']['mung_stagram']['Row'] & {
  profiles: {
    avatar_url: string | null;
    user_name: string;
  } | null;
};

export default function MungstaPostCard({
  post,
  priority = false
}: {
  post: Post;
  priority?: boolean;
}) {
  const avatarUrl = post.profiles?.avatar_url ?? '/default-avatar.png';
  const userName = post.profiles?.user_name ?? '알 수 없음';

  return (
    <div className={styles.mungstaItem}>
      <Link href={`/mungstagram/${post.id}`} scroll={false}>
        <div className={styles.profile}>
          <div>
            <Image src={avatarUrl} alt="avatar" width={40} height={40} quality={80} />
            <span>{userName}</span>
          </div>
        </div>
        <div className={priority ? styles.imagesPriority : styles.images}>
          {priority ? (
            <Image
              src={post.photo_url[0]}
              alt="게시글 이미지"
              width={276}
              height={276}
              priority
              fetchPriority="high"
              quality={70}
              sizes="276px"
            />
          ) : (
            <Image
              src={post.photo_url[0]}
              alt="게시글 이미지"
              fill
              quality={70}
              sizes="276px"
              loading="lazy"
            />
          )}
        </div>
        <div className={styles.info}>
          <h3>{post.title}</h3>
          <ul>{post.tags?.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
          <p>{post.content}</p>
        </div>
      </Link>
    </div>
  );
}
