'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsedGoodDetail } from '@/apis/goods';
import { useToast } from '@/hooks/useToast';
import { useChat } from '@/hooks/useChat';
import { useChatStore } from '@/shared/zustand/ChatStore';
import { useAlertMessage } from '@/hooks/useAlertMessage';

import Image from 'next/image';
import Loading from '@/app/_components/layout/loading/Loading';
import ClipBoardButton from '@/app/_components/shareButton/ClipBoardButton';
import KakaoShareButton from '@/app/_components/shareButton/KakaoShareButton';
import ChatList from '@/app/_components/chatting/ChatList';

import styles from './page.module.scss';
import kakaotalk from '../../../../../../public/images/kakaoLogo.png';
import { getformattedDate } from '@/utils/time';
import useAuth from '@/hooks/useAuth';
import { SlideImage, TradeLocationMap } from '@/app/(providers)/used-goods/_components';
import DetailHeader from '@/app/(providers)/used-goods/[id]/_component/DetailHeader';
import WishButton from '@/app/(providers)/used-goods/_components/WishButton';

export default function UsedGoodsDetailClient({ id }: { id: string }) {
  const user = useAuth((s) => s.user);
  const { warnTopRight, errorTopRight } = useToast();
  const { makeChatRoomMutateAsync, fetchChatRoom } = useChat();
  const { addAlertMessage } = useAlertMessage();
  const { setChatModalOpen, setChatRoomModalOpen, isChatModalOpen } = useChatStore();

  const { data, isLoading } = useQuery({
    queryKey: ['used-item', id],
    queryFn: () => getUsedGoodDetail(id)
  });

  if (isLoading) return <Loading />;
  if (!data) return null;

  const {
    created_at,
    title,
    content,
    price,
    profiles,
    photo_url,
    longitude,
    latitude,
    place_name,
    main_category,
    sub_category,
    sold_out,
    user_id
  } = data;

  /** 채팅 열기 */
  const openChat = async () => {
    if (!user) return warnTopRight({ message: '로그인 후 이용해주세요.' });
    if (user.id === user_id)
      return errorTopRight({ message: '본인 게시글에는 채팅할 수 없습니다.' });

    const existingRoom = fetchChatRoom?.find((c) => c?.post_id === Number(id));

    if (existingRoom) {
      setChatModalOpen(true);
      setChatRoomModalOpen(true);
      return;
    }

    const chat = await makeChatRoomMutateAsync({
      post_id: data.id,
      user_id: user.id,
      other_user: user_id
    });

    if (chat) {
      addAlertMessage({
        type: 'chat',
        message: `상품 [${title}]에 새 채팅이 도착했습니다.`,
        userId: user_id,
        targetId: +chat.id
      });
    }

    setChatModalOpen(true);
    setChatRoomModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <section className={styles.top}>
        <div className={styles.product}>
          <div className={styles.imageContainer}>
            <SlideImage images={photo_url} sizes={{ width: '400px', height: '400px' }} />
          </div>

          <div className={styles.details}>
            <DetailHeader data={data} />

            <div className={styles.profile}>
              {profiles && (
                <Image src={profiles.avatar_url!} alt="profile image" width={40} height={40} />
              )}
              <span>{profiles?.user_name}</span>
            </div>

            <div className={styles.moreInfo}>
              <time>{getformattedDate(created_at, 'YY년 MM월 DD일')}</time>
              <div>
                <span className={styles.tag}>#{main_category?.name}</span>
                <span className={styles.tag}>#{sub_category?.name}</span>
                {sold_out && <span className={styles.soldOut}>#판매완료</span>}
              </div>
            </div>

            <div className={styles.btns}>
              <button onClick={openChat}>채팅하기</button>
              <ChatList
                isOpen={isChatModalOpen}
                onClose={() => setChatModalOpen(false)}
                ariaHideApp={false}
              />
              {!sold_out && <WishButton usedItemId={id} title={title} />}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mid}>
        <h3>제품 상세 설명</h3>
        <p>{content}</p>
      </section>

      <section className={styles.bottom}>
        <h3>거래 희망 장소</h3>
        <p>{place_name}</p>
        <TradeLocationMap lat={latitude} lng={longitude} />

        <div className={styles.shareButton}>
          <KakaoShareButton>
            <button className={styles.kakaoButton}>
              <Image src={kakaotalk} alt="kakaotalk" width={45} height={45} />
            </button>
          </KakaoShareButton>
          <ClipBoardButton />
        </div>
      </section>
    </main>
  );
}
