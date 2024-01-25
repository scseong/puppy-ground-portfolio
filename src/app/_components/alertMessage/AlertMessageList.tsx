'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styles from './alertMessageList.module.scss';
import { useRouter } from 'next/navigation';
import { useAlertMessage } from '@/hooks/useAlertMessage';
import moment from 'moment';
import useAuth from '@/hooks/useAuth';

type Props = {
  setShowMessageList: (value: boolean) => void;
};

// type Alert = {
//   created_at: string;
//   id: string;
//   message: string;
//   status: boolean;
//   target_id: number;
//   type: string;
//   user_id: string;
// };

const AlertMessageList = ({
  // messageList,
  // hasNextPage,
  // isFetching,
  // fetchNextPage,
  setShowMessageList
}: Props) => {
  const router = useRouter();
  const user = useAuth((state) => state.user);
  const { fetchAlertMessage, updateAlertMessage } = useAlertMessage();

  const clickMessage = useCallback(
    async (item) => {
      let link = '/';
      if (item.type === 'wish') {
        link = `/used-goods/${item.target_id}`;
      } else if (item.type === 'like') {
        link = `/mungstagram/${item.target_id}`;
      }
      await router.push(link);
      await updateAlertMessage(item.id); // 각 메시지 항목의 id 사용
    },
    [router, updateAlertMessage]
  );

  const filterAlertMessage = fetchAlertMessage?.data?.filter((message) => {
    return message.user_id === user?.id;
  });

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).id !== 'previousButton') {
        // setShowMessageList(false);
      }
    },
    [setShowMessageList]
  );

  useEffect(() => {
    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, [clickHandler]);

  return (
    <div className={styles.alertContainer}>
      {filterAlertMessage?.length! > 0 && (
        <div className={styles.messageWrap}>
          {filterAlertMessage?.map((message) => {
            return (
              <div onClick={clickMessage}>
                <p>{message.message}</p>
                <p>{moment(message.created_at).format('yyyy-MM-DD HH:mm')}</p>
              </div>
            );
          })}
          {/* {isFetching && <p>알림을 가져오는 중입니다</p>} */}
          {/* <button
            id="previousButton"
            onClick={showMoreButton}
            disabled={!hasNextPage}
            className={!hasNextPage ? styles.disabled : ''}
          >
            {hasNextPage ? '지난 알림 보기' : '지난 알림이 없습니다'}
          </button> */}
        </div>
      )}
      {filterAlertMessage?.length === 0 && <p>알림이 없습니다🙅🏻‍♀️</p>}
    </div>
  );
};

export default AlertMessageList;
