'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import ChatModal from './ChatModal';
import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getChatRoomList, getOutChatRoom } from '@/apis/chat/chat';
import useAuth from '@/hooks/useAuth';
import styles from './chatList.module.scss';
import Chat from './Chat';
import ChatInput from './ChatInput';
import Loading from '../layout/loading/Loading';
import { IoIosArrowBack } from 'react-icons/io';
import ChatListContent from './ChatListContent';
import { useRouter } from 'next/navigation';
import UsedItemData from './UsedItemData';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ariaHideApp: boolean;
  isChatRoomOpen: boolean;
  list?: Tables<'chat_list'>;
  getChat?: Tables<'chat'>[] | null;
};

const ChatList = ({ isOpen, onClose, ariaHideApp, isChatRoomOpen, list, getChat }: ModalProps) => {
  // 유저 정보
  const user = useAuth((state) => state.user);

  const [isChatOpen, setIsChatOpen] = useState<boolean>(isChatRoomOpen);
  //전체 채팅내용
  const [chat, setChat] = useState<Tables<'chat'>[]>(getChat!);
  //로그인한 사람의 채팅 내역
  const [chatItem, setChatItem] = useState<Tables<'chat'>[]>([]);
  //채팅방 아이디
  const [chatListId, setChatListId] = useState<number>(0);
  //채팅방에서 쓸 중고물품 정보
  const [usedItem, setUsedItem] = useState<Tables<'used_item'>>();

  const chatListRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const {
    isError,
    isLoading,
    data: getChatListData
  } = useQuery({
    queryKey: ['chatRoom'],
    queryFn: () => getChatRoomList(user!.id),
    enabled: !!user,
    refetchOnWindowFocus: true
  });

  const queryClient = useQueryClient();

  const getOutChatRoomMutation = useMutation({
    mutationFn: getOutChatRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRoom'] });
    }
  });

  //채팅나가기
  const cliskOutChatRoom = ({ userId, chatListId }: { userId: string; chatListId: number }) => {
    Swal.fire({
      title: '방을 나가시겠습니까?',
      text: '대화한 내용이 모두 사라지고 대화를 다시 걸 수도 없습니다',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0ac4b9',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '방을 나갔습니다',
          icon: 'success'
        });
        getOutChatRoomMutation.mutate({ userId, chatListId });
      }
    });
  };

  // 클릭 시 채팅방 입장
  const clickChatRoom = ({
    id,
    other_user,
    usedItem
  }: {
    id: number;
    other_user: string;
    usedItem: Tables<'used_item'>;
  }) => {
    const chatHistory = chat?.filter((chat) => chat.chat_list_id === id);
    //안 읽은 채팅 읽음으로 바꿔야함으
    setChatItem(chatHistory!);
    // readChatMutation.mutate({ list_id: id, other_user });
    setChatListId(id);
    setUsedItem(usedItem);
    setIsChatOpen(true);
  };

  //클릭 시 중고물품 상세페이지로 이동
  const clickUsedItem = (usedItemId: number) => {
    router.push(`/used-goods/${usedItemId}`);
    closeModal();
  };

  // 스크롤
  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // 채팅 모달 닫았을 때 채팅목록으로 나가도록
  const closeModal = () => {
    onClose();
    setIsChatOpen(false);
  };

  type ChatListWithDate = {
    [date: string]: Tables<'chat'>[];
  };

  function makeSection(chatList: Tables<'chat'>[]): ChatListWithDate {
    const sections: ChatListWithDate = {};
    chatList.forEach((chat) => {
      const monthDate = dayjs(chat.created_at).locale('KO').format('YYYY-MM-DD ddd요일');
      if (Array.isArray(sections[monthDate])) {
        sections[monthDate].push(chat);
      } else {
        sections[monthDate] = [chat];
      }
    });
    return sections;
  }

  useEffect(() => {
    const chat = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat' },
        async (payload) => {
          const { data: chatData, error } = await supabase
            .from('chat')
            .select('*, profiles(user_name)')
            .eq('id', payload.new.id)
            .single();
          // payload.new에 chat_list_id 속성이 있는지 확인 후 업데이트
          if (chat && 'chat_list_id' in payload.new) {
            setChat((prev) => [...prev!, chatData as Tables<'chat'>]);
            // 특정 채팅방의 채팅 내용 업데이트
            if (chatData?.chat_list_id === chatListId || chatData?.chat_list_id === list?.id) {
              setChatItem((prev) => [...prev, chatData as Tables<'chat'>]);
            }
          }
        }
      )
      .subscribe();

    return () => {
      chat.unsubscribe();
    };
  }, [chatListId, list]);

  useEffect(() => {
    setChat(getChat || []); // getChat이 변경될 때 업데이트
  }, [getChat]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  if (isLoading) return <Loading />;
  if (isError) return <div>오류가 발생하였습니다...</div>;

  if (!user) return;

  const chatListwithDate = makeSection(chatItem);

  return (
    <div>
      <ChatModal isOpen={isOpen} onClose={closeModal} ariaHideApp={ariaHideApp}>
        {isChatOpen ? (
          <div>
            <div>
              <button className={styles.backBtn} onClick={() => setIsChatOpen(false)}>
                <IoIosArrowBack size={20} color={'#0AC4B9'} />
              </button>
              <UsedItemData
                usedItem={!!list?.used_item ? list?.used_item : usedItem}
                clickUsedItem={clickUsedItem}
              />
              <div ref={chatListRef} className={styles.chatScroll}>
                <div>
                  {Object.entries(chatListwithDate).map(([date, chatList]) => (
                    <div key={date}>
                      <div className={styles.date}>
                        <p>{date}</p>
                      </div>
                      {chatList.map((chat, idx) => (
                        <Chat key={idx} chatHistory={chat} userProfile={user.id} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <ChatInput chatListId={chatListId} listId={list?.id!} user={user} />
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.chatSearch}>
              채팅 <FaMagnifyingGlass color={'#0AC4B9'} />
            </div>
            <ul className={styles.chatListScroll}>
              {getChatListData?.getChatListData?.map((chat) => {
                return chat.user_id === user.id || chat.other_user === user.id ? (
                  <ChatListContent
                    key={chat.id}
                    chat={chat}
                    clickChatRoom={clickChatRoom}
                    userProfile={user.id}
                    cliskOutChatRoom={cliskOutChatRoom}
                  />
                ) : null;
              })}
            </ul>
          </div>
        )}
      </ChatModal>
    </div>
  );
};

export default ChatList;
