'use client';

import { sendChat } from '@/apis/chat/chat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styles from './chatInput.module.scss';
import { Tables } from '@/shared/supabase/types/supabase';
import { User } from '@supabase/supabase-js';

const ChatInput = ({
  chatListId,
  listId,
  user,
  userProfile
}: {
  chatListId: number;
  listId: number;
  user: User;
  userProfile: Tables<'profiles'>;
}) => {
  //채팅보내는 내용
  const [chatContent, setChatContent] = useState<string>('');
  const onChangeChatContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatContent(e.target.value);

  const sendChatMutation = useMutation({
    mutationFn: sendChat
  });

  // 채팅 보내기
  const clickSendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatContent === '') return;
    sendChatMutation.mutateAsync({
      content: chatContent,
      id: chatListId === 0 ? listId : chatListId,
      userId: user?.id!,
      userName: userProfile?.user_name
    });
    setChatContent('');
  };

  return (
    <form className={styles.form} onSubmit={clickSendChat}>
      <div className={styles.ChatInputSpace}>
        <input
          autoFocus
          placeholder="내용을 입력해주세요"
          value={chatContent}
          onChange={onChangeChatContent}
        />
        <button type="submit">전송</button>
      </div>
    </form>
  );
};

export default ChatInput;
