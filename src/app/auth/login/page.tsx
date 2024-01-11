'use client';
import { supabase } from '@/shared/supabase/supabase';
import { useEffect } from 'react';
import { FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginOnSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      console.log('로그인된 유저정보', data);
      if (error) {
        console.log('에러메세지', error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
    });
  }, []);

  const emailOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={loginOnSubmitHandler}>
      이메일:{' '}
      <input placeholder="이메일을 입력하세요" value={email} onChange={emailOnChangeHandler} />
      <br />
      비밀번호:{' '}
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={passwordOnChangeHandler}
      />
      <br />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginPage;

