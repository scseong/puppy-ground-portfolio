'use client';

import ReactModal from 'react-modal';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { customStyle } from '@/shared/modal';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { SlideImage } from '@/app/(providers)/used-goods/_components';
import { useState, useEffect } from 'react';
import { getCountFromTable } from '@/utils/table';
import { GoHeartFill, GoHeart, GoComment, GoShare } from 'react-icons/go';

const getPosts = async (id: string) => {
  const { data, error } = await supabase
    .from('mung_stagram')
    .select('*, mung_stagram_like(count), profiles(user_name)')
    .eq('id', id)
    .single();
  return data;
};

type PageProps = {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const MungModal = ({ params }: PageProps) => {
  const [isOpen, setOpen] = useState(true);
  const router = useRouter();
  const { id } = params;

  const { data: post, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPosts(id)
  });

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    document.body.setAttribute('style', 'overflow: hidden');
  }, []);

  useEffect(() => {
    if (!isOpen) {
      router.push('/mungstagram');
    }
    return () => {
      setOpen(false);
      document.body.setAttribute('style', 'overflow: auto');
    };
  }, [isOpen, router]);

  if (!post) return;

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Modal"
      style={customStyle}
    >
      <section className={styles.mungstaDetail}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.images}>
          <SlideImage images={post.photo_url} sizes={{ width: '600px', height: '450px' }} />
        </div>
        <div className={styles.detail}>
          <div className={styles.icons}>
            <div>
              <GoHeart />
              <span>{getCountFromTable(post.mung_stagram_like)}</span>
            </div>
            <div>
              <GoComment />
            </div>
            <div>
              <GoShare />
            </div>
          </div>
          <div className={styles.tags}>
            <ul>
              {post.tags.map((tag, idx) => (
                <li key={`${tag}-${idx}`}>#{tag}</li>
              ))}
            </ul>
          </div>
          <div className={styles.contents}>
            <p>
              <span className={styles.username}>{post.profiles!.user_name}</span> {post.content}
            </p>
          </div>
        </div>
      </section>
    </ReactModal>
  );
};

export default MungModal;
