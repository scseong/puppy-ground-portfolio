'use client';

import { Tables } from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import styles from './chatListContent.module.scss';
import { useEffect, useState } from 'react';

type PropsType = {
  chat: Tables<'chat_list'>;
  clickChatRoom: ({ id, other_user }: { id: number; other_user: string }) => void;
  userProfile: Tables<'profiles'>;
};

const ChatListContent = ({ chat: chatList, clickChatRoom, userProfile }: PropsType) => {
  const [readMessages, setReadMessages] = useState<(boolean | undefined)[]>();

  useEffect(() => {
    const readMessages = chatList.chat
      .map((chat) => (chat.user_id !== userProfile.id ? chat.read_status : undefined))
      .filter((chat) => chat === false);

    setReadMessages(readMessages);
  }, []);
  return (
    <li className={styles.chatList} key={chatList.id}>
      <div
        onClick={() => clickChatRoom({ id: chatList.id, other_user: chatList.other_user })}
        className={styles.chatContent}
      >
        <div>
          <Image
            width={50}
            height={50}
            src={`${chatList.used_item.photo_url[0]}`}
            alt="물건 사진"
          />
          {chatList.used_item.title}
        </div>
        <div className={readMessages?.length === 0 ? '' : styles.unreadMessages}>
          {readMessages?.length === 0 ? null : readMessages?.length}
        </div>
      </div>
      {/* <div className={styles.wastebaseket}>
    <span>
      <FaTrashAlt color={'#0AC4B9'} />
    </span>
  </div> */}
    </li>
  );
};

export default ChatListContent;
