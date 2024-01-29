'use client';

import ReactModal from 'react-modal';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { customStyle } from '@/shared/modal';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { SlideImage } from '@/app/(providers)/used-goods/_components';
import { useState, useEffect } from 'react';
import { GoComment, GoShare, GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Link from 'next/link';
import { getPosts } from '@/apis/mung-stagram/action';
import LikeButton from '../../_components/LikeButton';

const getPrevAndNextPost = async (id: string) => {
  const getPrevPost = supabase
    .from('mung_stagram')
    .select('id')
    .lt('id', id)
    .order('id', { ascending: false })
    .limit(1)
    .single();
  const getNextPost = supabase.from('mung_stagram').select('id').gt('id', id).limit(1).single();

  const response = await Promise.all([getPrevPost, getNextPost]);
  const [prev, next] = response.map((res) => res.data?.id);
  return { prev, next };
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

  const { data: prevAndNextPostId, isLoading } = useQuery({
    queryKey: ['nextPost', id],
    queryFn: () => getPrevAndNextPost(id)
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

  if (isLoading) return;

  const { prev, next } = prevAndNextPostId ?? {};

  return (
    <ReactModal
      className={styles.modal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Modal"
      style={customStyle}
      preventScroll
    >
      <section className={styles.mungstaDetail}>
        {prev && (
          <Link className={styles.prevLink} href={`/mungstagram/${prev}`}>
            <GoChevronLeft size="2.8rem" />
          </Link>
        )}
        {next && (
          <Link className={styles.nextLink} href={`/mungstagram/${next}`}>
            <GoChevronRight size="2.8rem" />
          </Link>
        )}
        <div className={styles.title}>{post.title}</div>
        <div className={styles.images}>
          <SlideImage images={post.photo_url} sizes={{ width: '600px', height: '450px' }} />
        </div>
        <div className={styles.detail}>
          <div className={styles.icons}>
            <LikeButton mungStargramId={params.id} title={post.title} />
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
