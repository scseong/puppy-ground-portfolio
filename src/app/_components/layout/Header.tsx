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
import { deleteCookie } from 'nextjs-cookie';
import Logo from '../../../../public/images/logo.png';
import { GoBell } from 'react-icons/go';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';

const Header = () => {
  const router = useRouter();
  const { errorTopRight, successTopRight } = useToast();
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);
  const isAuthInitialized = useAuth((state) => state.isAuthInitialized);
  const setIsAuthInitialized = useAuth((state) => state.setIsAuthInitialized);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
      setIsVisible(false);
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
    queryKey: ['chat'],
    queryFn: getChatContent,
    refetchOnWindowFocus: false
  });

  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const closeToggle = () => {
    setIsVisible(false);
  };

  if (isLoading) return <Loading />;

  if (!isAuthInitialized) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbarBox}>
          <div className={styles.logoBox}>
            <Image className={styles.logo} src={Logo} alt="logo" width={90} height={60} />
            <Link href="/" className={styles.logoText}>
              Puppy Ground
            </Link>
          </div>
          <div className={styles.menuBox}>
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
            {user ? (
              <>
                <div className={styles.menuEmojiPosition}>
                  <div className={styles.menuEmoji}>
                    <div className={styles.bell}>
                      <GoBell />
                    </div>
                    <button className={styles.chat} onClick={() => setModalIsOpen(true)}>
                      <IoChatbubbleEllipsesOutline />
                    </button>
                    <div className={styles.toggle}>
                      <RxHamburgerMenu size={25} onClick={handleToggle} />
                    </div>
                  </div>
                </div>
                {isVisible && (
                  <>
                    <div className={styles.toggleBackground} onClick={handleToggle}></div>
                    <div className={styles.toggleList}>
                      <div className={styles.toggleItems}>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/used-goods"
                        >
                          중고거래
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/stray-dogs"
                        >
                          유기견공고
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/facilities"
                        >
                          동반시설
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/mungstagram"
                        >
                          멍스타그램
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.toggleItem}
                          href={`/profile/${user.id}`}
                        >
                          마이페이지
                        </Link>
                        <div className={styles.toggleItem} onClick={signOut}>
                          로그아웃
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <Link className={styles.menuItem} href="/auth/signup">
                  회원가입
                </Link>
                <Link className={styles.menuItem} href="/auth/login">
                  로그인
                </Link>
                <div className={styles.menuEmojiPosition}>
                  <div className={styles.logOuttoggle}>
                    <RxHamburgerMenu size={25} onClick={handleToggle} />
                  </div>
                </div>
                {isVisible && (
                  <>
                    <div className={styles.toggleBackground} onClick={handleToggle}></div>
                    <div className={styles.toggleList}>
                      <div className={styles.toggleItems}>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/used-goods"
                        >
                          중고거래
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/stray-dogs"
                        >
                          유기견공고
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/facilities"
                        >
                          동반시설
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.togglemenu}
                          href="/mungstagram"
                        >
                          멍스타그램
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.toggleItem}
                          href="/auth/signup"
                        >
                          회원가입
                        </Link>
                        <Link
                          onClick={closeToggle}
                          className={styles.toggleItem}
                          href="/auth/login"
                        >
                          로그인
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ChatList
        isOpen={isModalOpen}
        onClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
        isChatRoomOpen={false}
        getChat={getChat!}
      />
    </>
  );
};

export default Header;
