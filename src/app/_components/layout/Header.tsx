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
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa';
import { deleteCookie } from 'nextjs-cookie';
import Logo from '../../../../public/images/logo.png';

const Header = () => {
  const router = useRouter();
  const { errorTopRight, successTopRight } = useToast();
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);
  const isAuthInitialized = useAuth((state) => state.isAuthInitialized);
  const setIsAuthInitialized = useAuth((state) => state.setIsAuthInitialized);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      if (!isAuthInitialized) {
        setIsAuthInitialized(true);
      }
    });
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      successTopRight({ message: '로그아웃 되었습니다.' });
      deleteCookie('access_token');
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

  // if (!isAuthInitialized) {
  //   return null;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.navbarBox}>
        <div className={styles.logoBox}>
          <Image src={Logo} alt="logo" width={90} height={60} />
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
                유기견공고
              </Link>
              <Link className={styles.menuItem} href="/facilities">
                동반시설
              </Link>
              <Link className={styles.menuItem} href="/mungstagram">
                멍스타그램
              </Link>
              <div className={styles.menuItem}>
                <button className={styles.chat} onClick={() => setModalIsOpen(true)}>
                  <IoChatbubbleEllipsesOutline />
                </button>
                <ChatList
                  isOpen={isModalOpen}
                  onClose={() => setModalIsOpen(false)}
                  ariaHideApp={false}
                  isChatRoomOpen={false}
                  listId={0}
                  getChat={getChat!}
                />
              </div>
              <div className={styles.bell}>
                <FaRegBell />
              </div>
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
              <Link className={styles.menuItem} href="/used-goods">
                중고거래
              </Link>
              <Link className={styles.menuItem} href="/stray-dogs">
                유기견공고
              </Link>
              <Link className={styles.menuItem} href="/facilities">
                동반시설
              </Link>
              <Link className={styles.menuItem} href="/mungstagram">
                멍스타그램
              </Link>
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
    </div>
  );
};

export default Header;
