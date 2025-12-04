'use client';

import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateUsedGood, deleteUsedGood } from '@/apis/used-goods/actions';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
import { useToast } from '@/hooks/useToast';
import { supabase } from '@/shared/supabase/supabase';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

export default function DetailHeader({ data }: any) {
  const { id, title, sold_out, photo_url, user_id } = data;

  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { errorTopRight } = useToast();

  /** 토글 닫기 */
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  /** 판매 완료 */
  const markSoldOut = async () => {
    const ok = await Swal.fire({
      title: '판매완료 처리할까요?',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '취소'
    });

    if (!ok.isConfirmed) return;

    const { error } = await updateUsedGood(Number(id), { sold_out: true });

    if (error) {
      Swal.fire({ title: '실패했습니다.', icon: 'error' });
      return;
    }

    Swal.fire({ title: '완료되었습니다.', icon: 'success' });
    queryClient.invalidateQueries({ queryKey: ['used-item', id] });
  };

  /** 삭제 */
  const deleteItem = async () => {
    const ok = await Swal.fire({
      title: '삭제할까요?',
      text: '복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true
    });

    if (!ok.isConfirmed) return;

    // 이미지 삭제
    await Promise.all(
      photo_url.map(async (url: string) => {
        const file = url.split('/').pop();
        if (!file) return;
        const { error } = await supabase.storage.from('used_goods').remove([file]);
        if (error) errorTopRight({ message: error.message });
      })
    );

    await deleteUsedGood(Number(id));
    router.push('/used-goods');
  };

  return (
    <div className={styles.infoWrap}>
      <div className={styles.info}>
        <h3 title={title}>{title}</h3>
        <span className={styles.price}>{data.price}원</span>
      </div>

      {/** 본인 게시글일 때만 표시 */}
      <button className={styles.editButton} onClick={() => setOpen(!open)}>
        <BsThreeDots size={18} />
        {open && (
          <div ref={modalRef}>
            {sold_out ? (
              <button disabled>판매완료</button>
            ) : (
              <button onClick={markSoldOut}>판매완료</button>
            )}
            <Link href={`/used-goods/update/${id}`}>
              <button>수정</button>
            </Link>
            <button onClick={deleteItem}>삭제</button>
          </div>
        )}
      </button>
    </div>
  );
}
