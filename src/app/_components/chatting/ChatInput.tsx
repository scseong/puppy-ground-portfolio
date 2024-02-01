'use client';

import { sendChat } from '@/apis/chat/chat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styles from './chatInput.module.scss';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/useToast';

const ChatInput = ({
  chatListId,
  listId,
  user
}: {
  chatListId: number;
  listId: number;
  user: User;
}) => {
  //채팅보내는 내용
  const [chatContent, setChatContent] = useState<string>('');
  const { warnTopRight } = useToast();
  const onChangeChatContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatContent(e.target.value);
  const queryClient = useQueryClient();
  const sendChatMutation = useMutation({
    mutationFn: sendChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', { chatListId }] });
    }
  });

  if (chatContent.length > 50) {
    warnTopRight({ message: '50자 이하로 입력해주세요!' });
  }
  // 채팅 보내기
  const clickSendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatContent === '') return;
    if (chatContent.length > 50) return;

    sendChatMutation.mutate({
      content: chatContent,
      id: chatListId === 0 ? listId : chatListId,
      userId: user?.id!
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
