import Link from 'next/link';
import Image from 'next/image';
import { Database } from '@/shared/supabase/types/supabase';
import styles from './page.module.scss';

type Post = Database['public']['Tables']['mung_stagram']['Row'] & {
  profiles: {
    avatar_url: string;
    user_name: string;
  };
};

export default function MungstaPostCard({ post }: { post: Post }) {
  return (
    <div className={styles.mungstaItem}>
      <Link href={`/mungstagram/${post.id}`} scroll={false}>
        <div className={styles.profile}>
          <div>
            <Image
              src={`${post.profiles!.avatar_url}?`}
              alt="avatar image"
              width="40"
              height="40"
              quality={60}
              priority
            />
            <span>{post.profiles!.user_name}</span>
          </div>
        </div>
        <div className={styles.images}>
          <Image
            src={`${post.photo_url[0]}?`}
            alt="게시글 이미지"
            width={270}
            height={270}
            quality={80}
            priority
          />
        </div>
        <div className={styles.info}>
          <h3>{post.title}</h3>
          <div>
            <ul>{post.tags && post.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
          </div>
          <p>{post.content}</p>
        </div>
      </Link>
    </div>
  );
}
