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
        chatHistory.user_id === userProfile.id ? styles.chatUserNameTrue : styles.chatUserNameFalse
      }
    >
      <div className={styles.userName}>
        <p>{chatHistory.profiles?.user_name}</p>
      </div>
      <div className={chatHistory.user_id === userProfile.id ? styles.myChat : styles.otherChat}>
        <div className={styles.content}>
          <p>{chatHistory.content}</p>
        </div>
      </div>
      <div className={styles.date}>
        {moment(chatHistory.created_at).locale('KO').add('h').format('MM월 DD일 A hh:mm')}
      </div>
    </div>
  );
};

export default Chat;
