import MungstaPostCard from './MungstaPostCard';
import styles from './mungstaPostList.module.scss';

interface Props {
  posts: any[];
  priorityFirst?: boolean;
}

export default function MungstaPostList({ posts, priorityFirst = false }: Props) {
  return (
    <div className={styles.mungstaList}>
      {posts.map((post, idx) => (
        <MungstaPostCard key={post.id} post={post} priority={priorityFirst && idx === 0} />
      ))}
    </div>
  );
}
