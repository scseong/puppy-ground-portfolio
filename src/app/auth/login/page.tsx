'use client';
import { supabase } from '@/shared/supabase/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  //  이메일 로그인
  const emailLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    console.log('로그인된 유저정보', data);
    if (error) {
      console.log('에러메세지', error);
    }
    if (data.user !== null) {
      alert('로그인되었습니다.');
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    });
  }, []);

  // 구글 로그인

  const googleLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    console.log('data', data);
  };

  const emailOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={emailLoginHandler}>
        이메일:
        <input
          required
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={emailOnChangeHandler}
        />
        <br />
        비밀번호:
        <input
          required
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={passwordOnChangeHandler}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
      <button onClick={googleLoginHandler}> 구글 로그인 </button>
      <button> 카카오 로그인 </button>
    </div>
  );
};

export default LoginPage;

