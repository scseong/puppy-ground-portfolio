import { useAlertMessage } from '@/hooks/useAlertMessage';
import { useRouter } from 'next/navigation';
import styles from './alertMessageRow.module.scss';
import { Tables } from '@/shared/supabase/types/supabase';
import moment from 'moment';

const AlertMessageRow = ({ item }: { item: Tables<'alert_message'> }) => {
  const { updateAlertMessage } = useAlertMessage();
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

  return (
    <div
      onClick={clickMessage}
      className={[item.status === true ? styles.read : styles.message].join('')}
    >
      <p>{item.message}</p>
      <div className={styles.deleteRow}>
        <span>{moment(item.created_at).format('yyyy-MM-DD HH:mm')}</span>
        <button>X</button>
      </div>
    </div>
  );
};

export default AlertMessageRow;
