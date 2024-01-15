'use client';

import { supabase } from '@/shared/supabase/supabase';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getCountFromTable } from '@/utils/table';
import KakaoMap from '@/app/_components/kakaoMap/KakaoMapMarker';
import { getformattedDate } from '@/utils/time';
import SlideImage from '../_components/SlideImage';

const getUsedGoodDetail = async (id: string) => {
  const { data, error } = await supabase
    .from('used_item')
    .select(
      `id, created_at, title, content, price, address, sold_out, photo_url, profiles ( * ), main_category ( name ), sub_category ( name ), used_item_wish ( count ), chat_list ( count )`
    )
    .eq('id', id)
    .single();

  return data;
};

const UsedGoodsDetail = ({ params }: { params: { id: string } }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['used-item'],
    queryFn: () => getUsedGoodDetail(params.id)
  });

  if (isLoading) return <span>LOADING</span>;
  if (!data) return null;

  const {
    id,
    created_at,
    title,
    content,
    price,
    profiles,
    photo_url,
    main_category,
    sub_category,
    used_item_wish
  } = data;

  return (
    <main className={styles.main}>
      <section className={styles.top}>
        <div className={styles.product}>
          <div className={styles.imageContainer}>
            <SlideImage images={photo_url} />
          </div>
          <div className={styles.details}>
            <div>
              {/* Info */}
              <div className={styles.info}>
                <h3 title={title}>{title}</h3>
                <span className={styles.price}>{price.toLocaleString('ko-KR')}원</span>
              </div>

              {/* Writer */}
              <div className={styles.profile}>
                {/* TODO: change to avatar_url */}
                <Image
                  src={'https://placehold.co/30x30'}
                  alt="profile image"
                  width="40"
                  height="40"
                />
                <span>{profiles?.user_name}</span>
              </div>

              {/* Category */}
              <div className={styles.moreInfo}>
                <time>{getformattedDate(created_at, 'YY년 YY월 DD일')}</time>
                <div>
                  <span className={styles.tag}>#{main_category!.name}</span>
                  <span className={styles.tag}>#{sub_category!.name}</span>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className={styles.btns}>
              <button>채팅하기</button>
              <button>찜 {getCountFromTable(used_item_wish)}</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mid}>
        <div className={styles.header}>
          <h3>제품 상세 설명</h3>
        </div>
        <div className={styles.content}>
          <p>{content}</p>
        </div>
      </section>

      <section className={styles.bottom}>
        <div className={styles.header}>
          <h3>거래 희망 장소</h3>
        </div>
        <div className={styles.content}>{/* TODO: 장소  */}</div>
      </section>
    </main>
  );
};

export default UsedGoodsDetail;
