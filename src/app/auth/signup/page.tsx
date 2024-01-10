'use client';
import { supabase } from '@/shared/supabase/supabase';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';

const SingUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const router: AppRouterInstance = useRouter();
  // const [pwCheck, setCheck] = useState('');

  //  핸들러
  const idOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const nicknameOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const passwordOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // const passwordCheckOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCheck(e.target.value);
  // };

  const singUpOnSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: nickname
          }
        }
      });
      console.log('data', data);
      if (error) {
        alert('회원가입에 실패했습니다.');
      }
      if (data) {
        alert('가입되었습니다.');
        router.push('/auth/login');
      }
    } catch (err) {}
  };
  return (
    <form onSubmit={singUpOnSubmitHandler}>
      <input
        placeholder="이메일을 입력하세요"
        required
        value={email}
        onChange={idOnchangeHandler}
      />
      <input
        placeholder="닉네임을 입력하세요"
        required
        value={nickname}
        onChange={nicknameOnchangeHandler}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        required
        value={password}
        onChange={passwordOnchangeHandler}
      />
      {/* <input
        type="password"
        placeholder="비밀번호 확인"
        required
        value={pwCheck}
        onChange={passwordCheckOnchangeHandler}
      /> */}
      <button>회원가입</button>
    </form>
  );
};

export default SingUp;

