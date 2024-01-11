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
  const [previewImg, setPreviewImg] = useState<File | null>();
  const router: AppRouterInstance = useRouter();
  // const [pwCheck, setCheck] = useState('');
  // console.log(previewImg);
  // console.log(Date.now());
  // console.log(Math.floor(Math.random() * 1000));

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
  const imageOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPreviewImg(e.target.files![0]);
  };

  // const passwordCheckOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCheck(e.target.value);
  // };

  const singUpOnSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (previewImg) {
    //   const { data, error } = await supabase.storage
    //     .from('profile_avatar')
    //     .upload(`profile`, previewImg);

    //   console.log('스토리지 데이터', data);
    //   console.log('스토리지 에러', error);
    // }
    // const { data } = supabase.storage.from('profile_avatar').createSignedUrl('profile', 6000);
    // console.log('다운로드 데이터', data);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: nickname,
          avatar_url: previewImg
        }
      }
    });
    console.log('data', data);
    if (error) {
      alert('회원가입에 실패했습니다.');
    }
    if (data.user !== null) {
      alert('가입되었습니다.');
      router.push('/auth/login');
    }
  };
  return (
    <form onSubmit={singUpOnSubmitHandler}>
      <input
        placeholder="이메일을 입력하세요"
        required
        value={email}
        onChange={idOnchangeHandler}
      />
      <br />
      <input
        placeholder="닉네임을 입력하세요"
        required
        value={nickname}
        onChange={nicknameOnchangeHandler}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        required
        value={password}
        onChange={passwordOnchangeHandler}
      />
      <br />
      {/* <input
        type="password"
        placeholder="비밀번호 확인"
        required
        value={pwCheck}
        onChange={passwordCheckOnchangeHandler}
      /> */}
      {/* <input type="file" accept="image/*" onChange={imageOnchangeHandler} /> */}
      <br />
      <button>회원가입</button>
    </form>
  );
};

export default SingUp;

