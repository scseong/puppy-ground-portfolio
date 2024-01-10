'use client';
import { FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const emailOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={loginOnSubmitHandler}>
      <input placeholder="이메일을 입력하세요" value={email} onChange={emailOnChangeHandler} />
      <input
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={passwordOnChangeHandler}
      />

      <button>로그인</button>
    </form>
  );
};

export default LoginPage;

