import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import MungstaPost from '../_components/detail/MungstaPost';
import getQueryClient from '@/app/_components/lib/getQueryClient';
import { getMungstaPost, getComments } from '@/apis/mung-stagram/action';

type Params = {
  id: string;
};

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = params;
  const post = await getMungstaPost(id);

  if (!post) return {};

  const title = `${post.title} | Puppy Ground`;
  const description = post.content;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.photo_url?.[0] ? [{ url: post.photo_url[0] }] : []
    }
  };
}

export const revalidate = 60;

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
