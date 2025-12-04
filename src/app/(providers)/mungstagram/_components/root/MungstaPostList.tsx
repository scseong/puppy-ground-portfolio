import MungstaPostCard from './MungstaPostCard';
import styles from './mungstaPostList.module.scss';

interface Props {
  posts: any[];
  priorityFirst?: boolean;
}

export default function MungstaPostList({ posts }: Props) {
  return (
    <div className={styles.mungstaList}>
      {posts.map((post, idx) => (
        <MungstaPostCard key={post.id} post={post} priority={idx === 0} />
      ))}
    </div>
  );
}
