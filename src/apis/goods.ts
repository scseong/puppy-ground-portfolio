import { supabase } from '@/shared/supabase/supabase';

export type SearchParamsKeys = 'main' | 'sub' | 'query' | 'page' | 'soldout';
export type SearchParams = {
  [key in SearchParamsKeys]?: string;
};

export const getUsedGoods = async () => {
  const { data } = await supabase
    .from('used_item')
    .select(
      `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
    );
  return data;
};

export const getUsedGoodsByCategory = async ({ main, sub }: { main?: string; sub?: string }) => {
  if (main && sub) {
    const { data } = await supabase
      .from('used_item')
      .select(
        `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
      )
      .eq('sub_category_id', sub)
      .eq('main_category_id', main);
    return data;
  }
  if (sub) {
    const { data } = await supabase
      .from('used_item')
      .select(
        `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
      )
      .eq('sub_category_id', sub);
    return data;
  }
  if (main) {
    const { data } = await supabase
      .from('used_item')
      .select(
        `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
      )
      .eq('main_category_id', main);

    return data;
  }
};

export const getUsedGoodsByKeyword = async (query: string) => {
  const { data } = await supabase
    .from('used_item')
    .select(
      `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
    )
    .ilike('title', `%${query}%`);
  return data;
};

export const getUsedGoodsByKeywordAndCategory = async (
  main: string,
  sub: string,
  query: string
) => {
  const { data } = await supabase
    .from('used_item')
    .select(
      `id, created_at, title, price, address, sold_out, photo_url, used_item_wish ( count ), chat_list ( count )`
    )
    .ilike('title', `%${query}%`)
    .eq('main_category_id', main)
    .eq('sub_category_id', sub);

  return data;
};

export const usedGoodsKeys = {
  all: ['used-goods'] as const,
  search: (params: SearchParams) => [...usedGoodsKeys.all, { query: params.query }] as const,
  category: (params: SearchParams) =>
    [...usedGoodsKeys.all, { main: params.main, sub: params.sub }] as const,
  categoryAndSearch: (params: SearchParams) =>
    [...usedGoodsKeys.all, { main: params.main, sub: params.sub, query: params.query }] as const
};

export const getQueryKey = (params: SearchParams) => {
  const { main, sub, query } = params;

  if (query && main && sub) return usedGoodsKeys.categoryAndSearch(params);
  if (query) return usedGoodsKeys.search(params);
  if (main || sub) return usedGoodsKeys.category(params);
  return usedGoodsKeys.all;
};

export const getQueryFunction = (params: SearchParams) => {
  const { main, sub, query } = params;

  if (main && sub && query) return () => getUsedGoodsByKeywordAndCategory(main, sub, query);
  if (main && sub) return () => getUsedGoodsByCategory({ main, sub });
  if (main) return () => getUsedGoodsByCategory({ main });
  if (sub) return () => getUsedGoodsByCategory({ sub });
  if (query) return () => getUsedGoodsByKeyword(query);
  return getUsedGoods;
};
