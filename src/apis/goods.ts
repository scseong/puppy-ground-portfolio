import { supabase } from '@/shared/supabase/supabase';

export type SearchParamsKeys = 'main' | 'sub' | 'query' | 'page' | 'soldout';
export type SearchParams = {
  [key in SearchParamsKeys]?: string;
};

export const getUsedGoods = async (params: SearchParams, pageSize: number = 8) => {
  const { main, sub, query, page, soldout } = params;
  const ITEMS_PER_PAGE = 8;

  let queryFn = supabase
    .from('used_item')
    .select(
      `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`,
      { count: 'exact' }
    );

  if (main) {
    const mainQuery = main?.includes('%') ? main?.split('%') : [main];
    queryFn = queryFn.in('main_category_id', mainQuery);
  }

  if (sub) queryFn = queryFn.eq('sub_category_id', sub);
  if (query) queryFn = queryFn.ilike('title', `%${query}%`);
  if (soldout) queryFn = queryFn.eq('sold_out', true);
  else queryFn = queryFn.eq('sold_out', false);
  if (page) {
    const from = (Number(page) - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    queryFn = queryFn.range(from, to);
  } else {
    queryFn = queryFn.range(0, ITEMS_PER_PAGE - 1);
  }
  queryFn = queryFn.order('created_at', { ascending: false });

  const { data, count } = await queryFn;

  return { data, count };
};

export const usedGoodsKeys = {
  all: (params: SearchParams) => ['used-goods', { ...params }] as const
};

export const getQueryKey = (params: SearchParams) => {
  return usedGoodsKeys.all(params);
};

export const getQueryFunction = (params: SearchParams) => {
  return () => getUsedGoods(params);
};

export const getUsedGoodDetail = async (id: string) => {
  const { data, error } = await supabase
    .from('used_item')
    .select(
      `*, profiles ( * ), main_category ( name ), sub_category ( name ), used_item_wish ( count ), chat_list ( count )`
    )
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};
