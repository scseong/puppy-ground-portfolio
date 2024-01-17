import moment from 'moment';
import styles from './chat.module.scss';
import { Tables } from '@/shared/supabase/types/supabase';

const Chat = ({
  chatHistory,
  userProfile
}: {
  chatHistory: Tables<'chat'>;
  userProfile: Tables<'profiles'>;
}) => {
  return (
    <div
      key={chatHistory.id}
      className={
        chatHistory.user_name === userProfile?.user_name
          ? styles.chatUserNameTrue
          : styles.chatUserNameFalse
      }
    >
      <div className={styles.userName}>
        <p>{chatHistory.user_name}</p>
      </div>
      <div className={styles.chatHistory}>
        <div className={styles.content}>
          <p>{chatHistory.content}</p>
          <span>{chatHistory.read_status}</span>
        </div>
      </div>
      <div className={styles.date}>
        {moment(chatHistory.created_at).locale('KO').add('h').format('MM월 DD일 A hh:mm')}
      </div>
    </div>
  );
};

export default Chat;
