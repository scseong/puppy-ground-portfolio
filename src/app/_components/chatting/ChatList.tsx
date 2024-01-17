'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import ChatModal from './ChatModal';
import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getChatList } from '@/apis/chat/chat';
import useAuth from '@/hooks/useAuth';
import { getProfile } from '@/apis/profile/profile';
import styles from './chatList.module.scss';
import Chat from './Chat';
import ChatInput from './ChatInput';
import Loading from '../layout/loading/Loading';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ariaHideApp: boolean;
  isChatRoomOpen: boolean;
  listId: number;
  getChat: Tables<'chat'>[] | null;
};

const ChatList = ({
  isOpen,
  onClose,
  ariaHideApp,
  isChatRoomOpen,
  listId,
  getChat
}: ModalProps) => {
  const { data: getChatListData } = useQuery({
    queryKey: ['getChatList'],
    queryFn: getChatList,
    refetchOnWindowFocus: false
  });
  const {
    isError,
    isLoading,
    data: getProfileData
  } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
    refetchOnWindowFocus: false
  });

  // 유저 정보
  const user = useAuth((state) => state.user);
  const userProfile = getProfileData?.find((pro) => pro.id === user?.id)!;

  const [isChatOpen, setIsChatOpen] = useState<boolean>(isChatRoomOpen);
  //전체 채팅내용
  const [chat, setChat] = useState<Tables<'chat'>[]>(getChat!);
  //로그인한 사람의 채팅 내역
  const [chatItem, setChatItem] = useState<Tables<'chat'>[]>([]);
  //중고물품의 아이디
  const [chatListId, setChatListId] = useState<number>(0);

  // 클릭 시 채팅방 입장
  const clickChatRoom = (id: number) => {
    const chatHistory = chat?.filter((chat) => chat.chat_list_id === id);
    setChatItem(chatHistory!);
    setChatListId(id);
    setIsChatOpen(true);
  };

  const chatContents = async () => {
    try {
      const { data: chat } = await supabase.from('chat').select('*').returns<Tables<'chat'>[]>();
      setChat(chat!);
    } catch (error) {
      console.log(error);
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
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat' }, (payload) => {
        // payload.new에 chat_list_id 속성이 있는지 확인 후 업데이트
        if (payload.new && 'chat_list_id' in payload.new) {
          setChat((prev) => [...prev!, payload.new as Tables<'chat'>]);
          // 특정 채팅방의 채팅 내용 업데이트
          if (payload.new.chat_list_id === chatListId || payload.new.chat_list_id === listId) {
            setChatItem((prev) => [...prev, payload.new as Tables<'chat'>]);
          }
        }
      })
      .subscribe();

    chatContents();

    return () => {
      chat.unsubscribe();
    };
  }, [chatListId, listId]);

  useEffect(() => {
    setChat(getChat || []); // getChat이 변경될 때 업데이트
  }, [getChat]);

  if (isLoading) return <Loading />;
  if (isError) return <div>오류가 발생하였습니다...</div>;

  return (
    <div>
      <ChatModal isOpen={isOpen} onClose={closeModal} ariaHideApp={ariaHideApp}>
        {isChatOpen ? (
          <>
            <button onClick={() => setIsChatOpen(false)}>이전으로</button>
            {chatItem.length === 0 ? (
              '채팅 내역이 없습니다! 첫 대화를 시작해보세요!'
            ) : (
              <div className={styles.chatScroll}>
                {chatItem.map((chatHistory) => {
                  return (
                    <Chat
                      key={chatHistory.id}
                      chatHistory={chatHistory}
                      userProfile={userProfile}
                    />
                  );
                })}
              </div>
            )}
            <ChatInput
              chatListId={chatListId}
              listId={listId}
              user={user!}
              userProfile={userProfile}
            />
          </>
        ) : (
          <>
            <div>
              채팅 <FaMagnifyingGlass />
            </div>
            <ul>
              {getChatListData?.getChatListData?.map((chat) => {
                return (
                  <li onClick={() => clickChatRoom(chat.id)} key={chat.id}>
                    {chat.used_item.title}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </ChatModal>
    </div>
  );
};

export default ChatList;
