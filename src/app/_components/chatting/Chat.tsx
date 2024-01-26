import styles from './chat.module.scss';
import { Tables } from '@/shared/supabase/types/supabase';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const Chat = ({
  chatHistory,
  userProfile
}: {
  chatHistory: Tables<'chat'>;
  userProfile: string;
}) => {
  return (
    <div
      key={chatHistory.id}
      className={
        chatHistory.user_id === userProfile ? styles.chatUserNameTrue : styles.chatUserNameFalse
      }
    >
      <div className={styles.userName}>
        <p>{userProfile !== chatHistory.user_id ? chatHistory.profiles?.user_name : ''}</p>
      </div>
      <div
        className={chatHistory.user_id === userProfile ? styles.chatDateTrue : styles.chatDateFalse}
      >
        <div className={chatHistory.user_id === userProfile ? styles.myChat : styles.otherChat}>
          <div className={styles.content}>
            <p>{chatHistory.content}</p>
          </div>
        </div>
        <div className={styles.date}>
          {dayjs(chatHistory.created_at).locale('KO').format('a hh:mm')}
        </div>
      </div>
    </div>
  );
};

export default Chat;
