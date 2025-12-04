import { fetchMungstaPosts } from '@/apis/mung-stagram/action';
import MungstaPostList from '@/app/(providers)/mungstagram/_components/root/MungstaPostList';

const PAGE_SIZE = 8;

export default async function MungstaPosts() {
  const posts = await fetchMungstaPosts({ from: 0, to: PAGE_SIZE - 1 });

  return <MungstaPostList posts={posts} />;
}
