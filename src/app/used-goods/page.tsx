import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { UsedGoodsList, UsedGoodsFilter } from './_components';
import { supabase } from '@/shared/supabase/supabase';

export const revalidate = 0;

export const getUsedGoods = async () => {
  const { data } = await supabase
    .from('used_item')
    .select(
      `id, created_at, title, price, address, sold_out, photo_url, main_category (name), sub_category (name) , used_item_wish ( count ), chat_list ( count )`
    );
  return data;
};

const UsedGoodsContainer = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['used-goods'],
    queryFn: getUsedGoods
  });

  return (
    <>
      <UsedGoodsFilter />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsedGoodsList />
      </HydrationBoundary>
    </>
  );
};

export default UsedGoodsContainer;
