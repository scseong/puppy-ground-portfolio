'use client';
import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
import { supabase } from '@/shared/supabase/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ChatList from '../chatting/ChatList';
import { useToast } from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getChatContent } from '@/apis/chat/chat';
import Loading from './loading/Loading';
import logo from '../../../../public/images/logo.png';

const Header = () => {
  const router = useRouter();
  const { errorTopRight, successTopRight } = useToast();
  const user = useAuth((state) => state.user);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      successTopRight({ message: '로그아웃 되었습니다.' });
      router.push('/');
    }
    if (error) {
      errorTopRight({ message: '오류가 발생했습니다. 다시 시도해주세요', timeout: 2000 });
    }
  };
  const {
    isError,
    isLoading,
    data: getChat
  } = useQuery({
    queryKey: ['getChat'],
    queryFn: getChatContent,
    refetchOnWindowFocus: false
  });

  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.navbarBox}>
      <div className={styles.logoBox}>
        <Image src={logo} alt="logo" width={90} height={60} />
        <Link href="/" className={styles.logoText}>
          Puppy Ground
        </Link>
      </div>
      <div className={styles.menuBox}>
        {user ? (
          <>
            <Link className={styles.menuItem} href="/used-goods">
              중고거래
            </Link>
            <Link className={styles.menuItem} href="/stray-dogs">
              유기견
            </Link>
            <Link className={styles.menuItem} href="/facilities">
              동반시설
            </Link>
            <Link className={styles.menuItem} href="/mungstagram">
              멍스타그램
            </Link>
            <div className={styles.menuItem}>
              <button onClick={() => setModalIsOpen(true)}>채팅</button>
              <ChatList
                isOpen={isModalOpen}
                onClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
                isChatRoomOpen={false}
                listId={0}
                getChat={getChat!}
              />
            </div>
            <div className={styles.menuItem}>알람</div>
            {/* 일단 임시로 */}
            <Link className={styles.menuItem} href={`/profile/${user.id}`}>
              마이페이지
            </Link>
            <div className={styles.menuItem} onClick={signOut}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <Link className={styles.menuItem} href="/auth/signup">
              회원가입
            </Link>
            <Link className={styles.menuItem} href="/auth/login">
              로그인
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
