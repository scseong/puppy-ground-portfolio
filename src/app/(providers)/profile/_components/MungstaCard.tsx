'use client';
import Link from 'next/link';
import styles from './mungstaCard.module.scss';
import Image from 'next/image';
import { likePost } from './List';

const MungstaCard = ({ posts }: { posts: likePost }) => {
  const { id, title, photo_url, content, tags, profiles } = posts;

  return (
    <section className={styles.container}>
      <div className={styles.mungstaItem}>
        <Link href={`/mungstagram/${id}`}>
          <div className={styles.profile}>
            <div>
              <Image
                src={`${profiles?.avatar_url}`}
                alt="avatar image"
                width="40"
                height="40"
                priority
              />
              <span>{profiles?.user_name}</span>
            </div>
          </div>
          <div className={styles.images}>
            <Image src={`${photo_url[0]}`} alt="게시글 이미지" width="250" height="250" priority />
          </div>
          <div className={styles.info}>
            <h3>{title}</h3>
            <div>
              <ul>{tags && tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
            </div>
            <p>{content}</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MungstaCard;
