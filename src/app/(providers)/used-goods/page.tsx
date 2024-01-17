import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { UsedGoodsList, UsedGoodsFilter } from './_components';
import { supabase } from '@/shared/supabase/supabase';

export const revalidate = 0;

export const getUsedGoods = async () => {
  const { data } = await supabase
    .from('used_item')
    .select(
      `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
    );
  return data;
};

export const getUsedGoodsByCategory = async (main: string, sub: string) => {
  const { data } = await supabase
    .from('used_item')
    .select(
      `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
    )
    .eq('main_category_id', main)
    .eq('sub_category_id', sub);
  return data;
};

// TODO: params type 지정
// TODO: 관심사 분리
export const getQueryKey = (params: any) => {
  const usedGoodsKeys = {
    all: ['used-goods'] as const,
    category: (params: any) => ['used-goods', { main: params.main, sub: params.sub }] as const
  };
  if (!Object.keys(params).length) return usedGoodsKeys.all;

  return usedGoodsKeys.category(params);
};
export const getQueryFunction = (params: any) => {
  if (!Object.keys(params).length) return getUsedGoods;
  return () => getUsedGoodsByCategory(params.main, params.sub);
};

const UsedGoodsContainer = async ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const [queryKey, queryFn] = [getQueryKey(searchParams), getQueryFunction(searchParams)];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

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
