import MungstaPostCard from './MungstaPostCard';
import { fetchMungstaPosts } from '@/apis/mung-stagram/action';
import styles from './page.module.scss';

const PAGE_SIZE = 8;

export default async function MungstaPosts() {
  const posts = await fetchMungstaPosts({ from: 0, to: PAGE_SIZE - 1 });

  return (
    <>
      <div className={styles.mungstaList}>
        {posts.map((post, idx) => (
          <MungstaPostCard key={post.id} post={post} priority={idx === 0} />
        ))}
      </div>
    </>
  );
}
