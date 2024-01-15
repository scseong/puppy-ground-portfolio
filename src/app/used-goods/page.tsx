import { supabase } from '@/shared/supabase/supabase';
import { QueryClient } from '@tanstack/react-query';
import { QueryData } from '@supabase/supabase-js';
import { UsedGoodsItem, UsedGoodsListFilter } from './_components';
import styled from './page.module.scss';

const usedItemsWithCategoryAndCountQuery = supabase
  .from('used_item')
  .select(
    `id, created_at, title, price, address, sold_out, photo_url, main_category (name), sub_category (name) , used_item_wish ( count ), chat_list ( count )`
  );
export type UsedItemsWithCategoryAndCount = QueryData<typeof usedItemsWithCategoryAndCountQuery>;
export const getUsedGooddsKey = 'used-goods';

export const getUsedGoods = async () => {
  const { data } = await usedItemsWithCategoryAndCountQuery;
  return data ?? [];
};

const UsedGoodsList = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [getUsedGooddsKey],
    queryFn: getUsedGoods
  });
  const usedGoods = queryClient.getQueryData<UsedItemsWithCategoryAndCount>([getUsedGooddsKey]);

  return (
    <div>
      <h2 className={styled.title}>중고 물품 리스트</h2>
      <UsedGoodsListFilter />
      <div className={styled.goodList}>
        {usedGoods?.map((goods) => <UsedGoodsItem key={goods.id} goods={goods} />)}
      </div>
    </div>
  );
};

export default UsedGoodsList;
