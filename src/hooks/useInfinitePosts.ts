import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMungstaPosts } from '@/apis/mung-stagram/action';

const PAGE_SIZE = 8;

export function useInfinitePostData() {
  return useInfiniteQuery({
    queryKey: ['mungstagram', 'list'],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const posts = await fetchMungstaPosts({ from, to });
      return posts;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
    staleTime: Infinity,
    enabled: false
  });
}
