import { getUsedGood } from '@/apis/used-goods/actions';
import UpdateForm from './UpdateForm';

export const revalidate = 0;

type Props = {
  params: { id: string };
  searchParams: string;
};

const page = async (props: Props) => {
  const usedItem = await getUsedGood(Number(props.params.id));
  if (!usedItem) return <div>존재하지 않는 상품입니다.</div>;
  return <UpdateForm usedItem={usedItem} />;
};

export default page;
