import React, { useCallback, useEffect } from 'react';
import styles from './alertMessageList.module.scss';
import { Tables } from '@/shared/supabase/types/supabase';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAlertMessage } from '@/hooks/useAlertMessage';
import moment from 'moment';
import { AlertType } from '@/apis/alertMessage';

type Props = {
  messageList: Tables<'alert_message'>[];
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<(Tables<'alert_message'> | null)[], Error>>;
  setShowMessageList: (value: boolean) => void;
};

type Alert = {
  id: string;
  type: string;
  target_id: number;
};

const AlertMessageList = ({
  messageList,
  hasNextPage,
  isFetching,
  fetchNextPage,
  setShowMessageList
}: Props) => {
  const router = useRouter();
  const { updateAlertMessage } = useAlertMessage();

  const clickMessage = useCallback(
    (item: Alert) => {
      let link = '/';
      if (item.type === 'wish') {
        link = `/used-goods/${item.target_id}`;
      } else if (item.type === 'like') {
        link = `/mungstagram/${item.target_id}`;
      }
      router.push(link).then(() => {
        updateAlertMessage(item.id); // 각 메시지 항목의 id 사용
      });
    },
    [router, updateAlertMessage]
  );

  // const clickMessage = () => {
  //   router.push(link).then(() => {
  //     updateAlertMessage(messageList.id);
  //   });
  // };

  const showMoreButton = () => {
    if (hasNextPage) fetchNextPage();
  };

  const closeClickHandler = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).id !== 'previousButton') {
        setShowMessageList(false);
      }
    },
    [setShowMessageList]
  );

  useEffect(() => {
    window.addEventListener('click', closeClickHandler);
    return () => {
      window.removeEventListener('click', closeClickHandler);
    };
  }, [closeClickHandler]);

  return (
    <div className={styles.alertContainer}>
      {messageList.length > 0 && (
        <div className={styles.messageWrap}>
          {messageList.map((item) => {
            return (
              <div onClick={clickMessage}>
                <p>{item.message}</p>
                <p>{moment(item.created_at).format('yyyy-MM-DD HH:mm')}</p>
              </div>
            );
          })}
          {isFetching && <p>알림을 가져오는 중입니다</p>}
          <button
            id="previousButton"
            onClick={showMoreButton}
            disabled={!hasNextPage}
            className={!hasNextPage ? styles.disabled : ''}
          >
            {hasNextPage ? '지난 알림 보기' : '지난 알림이 없습니다'}
          </button>
        </div>
      )}
      {messageList.length === 0 && <p>알림이 없습니다🙅🏻‍♀️</p>}
    </div>
  );
};

export default AlertMessageList;
