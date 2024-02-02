'use client';
import Image from 'next/image';
import styles from './commentList.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/apis/mung-stagram/action';
import useAuth from '@/hooks/useAuth';
import { useParams } from 'next/navigation';

const CommentList = () => {
  const user = useAuth((state) => state.user);
  const params = useParams();

  const { data: comments, error } = useQuery({
    queryKey: ['mung_stagram_comments'],
    queryFn: () => {
      return getComments(Number(params.id));
    }
  });

  console.log(comments);
  if (error) return <div>댓글을 불러오는데 실패했습니다</div>;

  return (
    <div className={styles.container}>
      {comments?.map((comment) => (
        <div className={styles.infoBox} key={comment.id}>
          {/* <Image src={comment.profiles} alt="comment" width={20} height={20} /> */}
          <div>{comment.content}</div>
          <div>{comment.created_at}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
