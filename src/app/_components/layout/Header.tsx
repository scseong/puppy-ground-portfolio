'use client';
import Link from 'next/link';
import styles from './header.module.scss';
import Image from 'next/image';
import { supabase } from '@/shared/supabase/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Chat from '../chatting/Chat';
import useUserInfo from '../../../../zustand/useUserInfo';
import { useToast } from '@/hooks/useToast';

const Header = () => {
  const router = useRouter();
  const userInfo = useUserInfo((state: any) => state.initialState);
  const user = useUserInfo((state: any) => state.removeUser);
  const setUser = useUserInfo((state: any) => state.setUser);
  const { errorTopRight, successTopRight } = useToast();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('123', event, session);
      setUser(session?.user);
      // if (event !== 'SIGNED_OUT' && session === null) {
      //   Swal.fire({
      //     icon: 'error',
      //     text: '로그인을 다시 시도해주세요'
      //   });
      //   router.push('/auth/login');
      // }
    });
  }, [userInfo]);

  const initialState = useUserInfo((state: any) => state.initialState);
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    user();
    console.log('로그아웃 에러', error);
    if (!error) {
      successTopRight({ message: '로그아웃 되었습니다.' });
      router.push('/');
    }
    if (error) {
      errorTopRight({ message: '오류가 발생했습니다. 다시 시도해주세요', timeout: 2000 });
    }
  };
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.navbarBox}>
      <div className={styles.logoBox}>
        <Image src="/logo.png" alt="logo" width={90} height={60} />
        <Link href="/" className={styles.logoText}>
          Puppy Ground
        </Link>
      </div>
      <div className={styles.menuBox}>
        {userInfo ? (
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
              <Chat
                isOpen={isModalOpen}
                onClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
              />
            </div>
            <div className={styles.menuItem}>알람</div>
            {/* 일단 임시로 */}
            <Link className={styles.menuItem} href={`/profile/`}>
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
