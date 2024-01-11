'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import ChatModal from './ChatModal';
import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import style from './chat.module.scss';
import moment from 'moment';

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

const sendChat = async ({
  content,
  id,
  userId,
  userName
}: {
  content: string;
  id: number;
  userId: string;
  userName: string;
}) => {
  await supabase
    .from('chat')
    .insert([{ content, chat_list_id: id, user_id: userId, user_name: userName }])
    .select();
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

  const queryClient = useQueryClient();
  const sendChatMutation = useMutation({
    mutationFn: sendChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getChat'] });
    }
  });

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatItem, setChatItem] = useState<Tables<'chat'>[]>([]);
  const [chatListId, setChatListId] = useState<number>(0);
  const [chatContent, setChatContent] = useState<string>('');
  const onChangeChatContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatContent(e.target.value);

  const userName = '오늘은치킨이닭';

  // 클릭 시 채팅방 입장
  const clickChatRoom = (id: number) => {
    const chatHistory = getChatData?.getChatData?.filter((chat) => chat.chat_list_id === id);
    setChatItem(chatHistory!);
    setChatListId(id);
    setIsChatOpen(true);
  };

  // 채팅 보내기
  const clickSendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChatMutation.mutate({
      content: chatContent,
      id: chatListId,
      userId: 'cf215d96-16ce-494f-96df-1f7e42c58c6a',
      userName
    });
  };

  useEffect(() => {
    const chat = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat' }, (payload) => {})
      .subscribe();

    return () => {
      chat.unsubscribe();
    };
  }, []);

  return (
    <div>
      <ChatModal isOpen={isOpen} onClose={onClose} ariaHideApp={ariaHideApp}>
        {isChatOpen ? (
          <>
            <button onClick={() => setIsChatOpen(false)}>이전으로</button>
            {chatItem.length === 0 ? (
              '채팅 내역이 없습니다! 첫 대화를 시작해보세요!'
            ) : (
              <div>
                {chatItem.map((chatHistory) => {
                  return (
                    <div
                      key={chatHistory.id}
                      className={
                        chatHistory.user_name === userName
                          ? style.chatUserNameTrue
                          : style.chatUserNameFalse
                      }
                    >
                      <div className={style.userName}>
                        <p>{chatHistory.user_name}</p>
                      </div>
                      <div className={style.chatHistory}>
                        <div className={style.content}>
                          <p>{chatHistory.content}</p>
                          <span>{chatHistory.read_status}</span>
                        </div>
                      </div>
                      <div className={style.date}>
                        {moment(chatHistory.created_at)
                          .locale('KO')
                          .add(-9, 'h')
                          .format('MM월 DD일 A hh:mm')}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <form onSubmit={clickSendChat} className={style.ChatInputSpace}>
              <input
                placeholder="내용을 입력해주세요"
                value={chatContent}
                onChange={onChangeChatContent}
              />
              <button type="submit">전송</button>
            </form>
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
