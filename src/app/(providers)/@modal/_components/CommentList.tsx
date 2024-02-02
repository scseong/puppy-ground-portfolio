'use client';
import Image from 'next/image';
import styles from './commentList.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/apis/mung-stagram/action';
import { useParams } from 'next/navigation';
import { getStringFromNow } from '@/utils/time';
import { Fragment } from 'react';

const CommentList = () => {
  const params = useParams();

  const { data: comments, error } = useQuery({
    queryKey: ['mung_stagram_comments', params.id],
    queryFn: () => {
      return getComments(Number(params.id));
    }
  });

  if (error) return <div>댓글을 불러오는데 실패했습니다</div>;

  return (
    <Fragment>
      {comments?.map((comment) => (
        <div className={styles.container} key={comment.id}>
          <div className={styles.right}>
            <Image src={comment.profiles?.avatar_url ?? ''} alt="comment" width={35} height={35} />
          </div>
          <div className={styles.left}>
            <div className={styles.name}>{comment.profiles?.user_name}</div>
            <div className={styles.contentBox}>
              <div className={styles.content}>{comment.content}</div>
              <time>{getStringFromNow(comment.created_at)}</time>
          </div>
            </div>
        </div>
      ))}
    </Fragment>
  );
};

export default CommentList;
