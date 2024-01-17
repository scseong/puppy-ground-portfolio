import Image from 'next/image';
import Link from 'next/link';
import styled from './usedGoodsItem.module.scss';
import { getStringFromNow } from '@/utils/time';
import { getCountFromTable } from '@/utils/table';

type UsedGoodsItemProps = {
  goods: {
    id: number;
    created_at: string;
    title: string;
    price: number;
    address: string;
    sold_out: boolean;
    photo_url: string[];
    used_item_wish: object;
    chat_list: object;
  };
};

const UsedGoodsItem = ({ goods }: UsedGoodsItemProps) => {
  const { id, created_at, title, photo_url, sold_out, address, price, used_item_wish, chat_list } =
    goods;

  return (
    <div className={styled.container}>
      <Link href={`used-goods/${id}`}>
        <div className={styled.goodsImage}>
          <Image src={photo_url[0]} alt="상품 이미지" width={250} height={250} />
          {/* TODO: 판매완료 이미지로 변경 */}
          {sold_out && <div className={styled.overlay}>판매완료</div>}
        </div>
        <div className={styled.goodsInfo}>
          <h3>{title}</h3>
          <span>{price}원</span>
          <time>{getStringFromNow(created_at)}</time>
          <address>{address}</address>
          <span>찜 {getCountFromTable(used_item_wish)}</span>
          <span>채팅 {getCountFromTable(chat_list)}</span>
        </div>
      </Link>
    </div>
  );
};

export default UsedGoodsItem;
