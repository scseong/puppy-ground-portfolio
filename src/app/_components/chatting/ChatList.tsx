'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import ChatModal from './ChatModal';
import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getChatRoomList, readChat } from '@/apis/chat/chat';
import useAuth from '@/hooks/useAuth';
import styles from './chatList.module.scss';
import Chat from './Chat';
import ChatInput from './ChatInput';
import Loading from '../layout/loading/Loading';
import { IoIosArrowBack } from 'react-icons/io';
import ChatListContent from './ChatListContent';
import { useRouter } from 'next/navigation';
import UsedItemData from './UsedItemData';

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
  // const userProfile = getProfileData?.find((pro) => pro.id === user?.id)!;
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
  const queryClient = useQueryClient();

  const {
    isError,
    isLoading,
    data: getChatListData
  } = useQuery({
    queryKey: ['chatRoom'],
    queryFn: () => getChatRoomList(user!.id),
    refetchOnWindowFocus: true
  });

  const readChatMutation = useMutation({
    mutationFn: readChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getChat'] });
    }
  });

  const chatContents = async () => {
    try {
      const { data: chat } = await supabase
        .from('chat')
        .select('*, profiles(user_name)')
        .order('created_at', { ascending: true })
        .returns<Tables<'chat'>[]>();
      console.log(chat);
      setChat(chat!);
    } catch (error: any) {}
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
    readChatMutation.mutate({ list_id: id, other_user });
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

  useEffect(() => {
    const chat = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, (payload) => {
        console.log('payload', payload);
        // payload.new에 chat_list_id 속성이 있는지 확인 후 업데이트
        if (payload.new && 'chat_list_id' in payload.new) {
          setChat((prev) => [...prev!, payload.new as Tables<'chat'>]);
          // 특정 채팅방의 채팅 내용 업데이트
          if (payload.new.chat_list_id === chatListId || payload.new.chat_list_id === list?.id) {
            setChatItem((prev) => [...prev, payload.new as Tables<'chat'>]);
          }
        }
      })
      .subscribe();

    chatContents();

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
                  {chatItem.map((chatHistory) => {
                    return (
                      <Chat key={chatHistory.id} chatHistory={chatHistory} userProfile={user.id} />
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <ChatInput chatListId={chatListId} listId={list?.id!} user={user!} />
            </div>
          </div>
        ) : (
          <>
            <div className={styles.chatSearch}>
              채팅 <FaMagnifyingGlass color={'#0AC4B9'} />
            </div>
            <ul className={styles.chatScroll}>
              {getChatListData?.getChatListData?.map((chat) => {
                return chat.user_id === user.id || chat.other_user === user.id ? (
                  <ChatListContent
                    key={chat.id}
                    chat={chat}
                    clickChatRoom={clickChatRoom}
                    userProfile={user.id}
                  />
                ) : null;
              })}
            </ul>
          </>
        )}
      </ChatModal>
    </div>
  );
};

export default ChatList;
