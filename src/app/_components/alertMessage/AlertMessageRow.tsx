import { useAlertMessage } from '@/hooks/useAlertMessage';
import { useRouter } from 'next/navigation';
import styles from './alertMessageRow.module.scss';
import { Tables } from '@/shared/supabase/types/supabase';
import moment from 'moment';
import { useToast } from '@/hooks/useToast';

const AlertMessageRow = ({ item }: { item: Tables<'alert_message'> }) => {
  const { updateAlertMessage, deleteAlertMessageId } = useAlertMessage();
  const { successTopRight } = useToast();
  const router = useRouter();

  let link = '/';

  if (item.type === 'wish') {
    link = `/used-goods/${item.target_id}`;
  } else if (item.type === 'like') {
    link = `/mungstagram/${item.target_id}`;
  }
  const clickMessage = async () => {
    router.push(link);
    await updateAlertMessage(item.id);
  };

  const deleteReadMessageButton = async () => {
    await deleteAlertMessageId(item.id);
    successTopRight({ message: '메시지가 삭제되었습니다' });
  };

  return (
    <div className={[item.status === true ? styles.read : styles.container].join('')}>
      <div onClick={clickMessage} className={styles.messageWrap}>
        <p>{item.message}</p>
      </div>
      <div className={styles.deleteRow}>
        <span>{moment(item.created_at).format('yyyy-MM-DD HH:mm')}</span>
        <button onClick={deleteReadMessageButton} className={styles.button}>
          X
        </button>
      </div>
    </div>
  );
};

export default AlertMessageRow;
