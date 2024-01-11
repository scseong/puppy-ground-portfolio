'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import ChatModal from './ChatModal';
import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import style from './chat.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;

  ariaHideApp: boolean;
};

const getChatList = async () => {
  const getChatListQuery = await supabase
    .from('chat_list')
    .select('*, profiles(*), used_item(title)')
    .order('id', { ascending: false })
    .returns<Tables<'chat_list'>[]>();

  const { data: getChatListData, error } = getChatListQuery;
  return { getChatListData, error };
};

const getChat = async () => {
  const getChatQuery = await supabase
    .from('chat')
    .select('*')
    .order('id', { ascending: true })
    .returns<Tables<'chat'>[]>();

  const { data: getChatData, error } = getChatQuery;
  return { getChatData, error };
};

const Chat = ({ isOpen, onClose, ariaHideApp }: ModalProps) => {
  const {
    isLoading,
    isError,
    data: getChatListData
  } = useQuery({
    queryKey: ['getChatList'],
    queryFn: getChatList,
    refetchOnWindowFocus: false
  });
  const { data: getChatData } = useQuery({
    queryKey: ['getChat'],
    queryFn: getChat,
    refetchOnWindowFocus: false
  });

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<Tables<'chat'>[]>([]);

  const clickChatRoom = (id: number) => {
    const chatHistory = getChatData?.getChatData?.filter((chat) => chat.chat_list_id === id);
    setChatContent(chatHistory!);
    setIsChatOpen(true);
  };

  return (
    <div>
      <ChatModal isOpen={isOpen} onClose={onClose} ariaHideApp={ariaHideApp}>
        {isChatOpen ? (
          <>
            <button onClick={() => setIsChatOpen(false)}>이전으로</button>
            <div>채팅방</div>
            <ul>
              {chatContent.map((chatHistory) => {
                return <li key={chatHistory.id}>{chatHistory.content}</li>;
              })}
            </ul>
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

export default Chat;
