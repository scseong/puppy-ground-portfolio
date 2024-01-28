import Image from 'next/image';
import styles from './card.module.scss';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { addCommasToNumber } from '@/utils/format';
import { getStringFromNow } from '@/utils/time';
import { getCountFromTable } from '@/utils/table';
import Link from 'next/link';

type wishGoodsProps = {
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

const Card = ({ goods }: wishGoodsProps) => {
  const { id, created_at, title, photo_url, sold_out, address, price, used_item_wish, chat_list } =
    goods;

  return (
    <Link href={`/used-goods/${id}`}>
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={photo_url[0]} alt="상품 이미지" width={250} height={250} />
        {sold_out && <div className={styles.overlay}></div>}
        <div className={styles.info}>
          <h3>{title}</h3>
          <div className={styles.detail}>
            <span>{addCommasToNumber(price)}원</span>
            <time>{getStringFromNow(created_at)}</time>
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
      </div>
    </div>
    </Link>
  );
};

export default Card;
