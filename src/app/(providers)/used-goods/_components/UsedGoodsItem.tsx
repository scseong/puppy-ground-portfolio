import Image from 'next/image';
import Link from 'next/link';
import styles from './usedGoodsItem.module.scss';
import { getStringFromNow } from '@/utils/time';
import { getCountFromTable } from '@/utils/table';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { addCommasToNumber } from '@/utils/format';

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
    <div className={styles.container}>
      <Link href={`used-goods/${id}`}>
        <div className={styles.goodsImage}>
          <Image src={photo_url[0]} alt="상품 이미지" width={350} height={320} />
          {sold_out && <div className={styles.overlay}></div>}
        </div>
        <div className={styles.goodsInfo}>
          <h3>{title}</h3>
          <div className={styles.detail}>
            <span>{addCommasToNumber(price)}원</span>
            <time suppressHydrationWarning>{getStringFromNow(created_at)}</time>
          </div>
          <div className={styles.address}>
            <FaMapMarkerAlt />
            <address>{address}</address>
          </div>
          <div className={styles.count}>
            <span>찜 {getCountFromTable(used_item_wish)}개</span>
            <span className={styles.divide}></span>
            <span>채팅 {getCountFromTable(chat_list)}개</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UsedGoodsItem;
