import { getMungstaPosts } from '@/apis/mung-stagram/action';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/_components/lib/getQueryClient';
import MungstaPosts from './_components/root/MungstaPosts';

export const revalidate = 0;

const MungstaMainPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['munstagram'],
    queryFn: getMungstaPosts
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MungstaPosts />
    </HydrationBoundary>
  );
};

export default MungstaMainPage;
