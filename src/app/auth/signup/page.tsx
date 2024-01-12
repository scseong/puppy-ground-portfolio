'use client';
import { supabase } from '@/shared/supabase/supabase';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.scss';

const SingUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [previewImg, setPreviewImg] = useState<string>(
    'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
  );
  const [uploadImg, setUploadImg] = useState<File | null | string>();
  const router: AppRouterInstance = useRouter();
  // const [pwCheck, setCheck] = useState('');
  // console.log(previewImg);
  // console.log(Date.now());

  //  핸들러
  const idOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const nicknameOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const passwordOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const imageOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadImg(e.target.files![0]);
    setPreviewImg(URL.createObjectURL(e.target.files![0]));
  };

  // const passwordCheckOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCheck(e.target.value);
  // };

  // 이메일 회원가입
  const singUpOnSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imgUrl = 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png';
    if (uploadImg) {
      const { data, error } = await supabase.storage
        .from('profile_avatar')
        .upload(`profile/${Date.now()}_${Math.floor(Math.random() * 1000)}`, uploadImg);

      console.log('스토리지 데이터', data);
      console.log('스토리지 에러', error);
      const { data: url } = supabase.storage.from('profile_avatar').getPublicUrl(`${data!.path}`);
      console.log('유알엘', url.publicUrl);
      imgUrl = url.publicUrl;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: nickname,
          avatar_url: imgUrl
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
      <img alt="이미지 없음" className={styles.previewImg} src={previewImg} />
      <label htmlFor="preview">
        <input
          className={styles.imageInput}
          type="file"
          accept="image/*"
          id="preview"
          onChange={imageOnchangeHandler}
        />
      </label>
      <br />
      <button>회원가입</button>
    </form>
  );
};

export default SingUp;

