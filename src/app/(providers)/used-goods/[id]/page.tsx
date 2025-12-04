import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import UsedGoodsDetailClient from '@/app/(providers)/used-goods/[id]/_component/UsedGoodsDetailClient';
import { getUsedGoodDetail } from '@/apis/goods';

export const revalidate = 0;

export default async function UsedGoodsDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['used-item', params.id],
    queryFn: () => getUsedGoodDetail(params.id)
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UsedGoodsDetailClient id={params.id} />
    </HydrationBoundary>
  );
}
