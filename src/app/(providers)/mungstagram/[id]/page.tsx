import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import MungstaPost from '../_components/detail/MungstaPost';
import getQueryClient from '@/app/_components/lib/getQueryClient';
import { getMungstaPost, getComments } from '@/apis/mung-stagram/action';

export const revalidate = 0;

type Params = {
  id: string;
};

const MungstaPage = async ({ params }: { params: Params }) => {
  const { id: postId } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['munstagram', postId],
    queryFn: () => getMungstaPost(postId)
  });

  await queryClient.prefetchQuery({
    queryKey: ['mung_stagram_comments', postId],
    queryFn: () => getComments(Number(postId))
  });


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MungstaPost postId={postId} />
    </HydrationBoundary>
  );
};

export default MungstaPage;
