'use client';
import { supabase } from '@/shared/supabase/supabase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';
import { useToast } from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';

export type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { errorTopRight, successTopRight } = useToast();
  const setUser = useAuth((state) => state.setUser);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ mode: 'onChange' });
  const router = useRouter();

  //  이메일 로그인
  const emailLoginHandler = async (data: Inputs) => {
    const { data: emailData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });
    if (error) {
      console.log('에러메세지', error);
      errorTopRight({ message: '오류가 발생했습니다. 다시 시도해주세요', timeout: 2000 });
    }
    if (emailData.user !== null) {
      setUser(emailData.user);
      successTopRight({ message: '로그인되었습니다', timeout: 2000 });
      router.push('/');
    }
  };

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

    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log('유저데이터', userData);
    console.log('구글', data);
    if (error) {
      errorTopRight({ message: '오류가 발생했습니다. 다시 시도해주세요', timeout: 2000 });
    }
  };

  // 카카오 로그인
  const kakaoLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    console.log('카카오', data);
    if (error) {
      errorTopRight({ message: '오류가 발생했습니다. 다시 시도해주세요', timeout: 2000 });
    }
  };

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

  return (
    <div>
      <form onSubmit={handleSubmit(emailLoginHandler)}>
        이메일:
        <input
          placeholder="이메일을 입력하세요"
          {...register('email', { required: true, pattern: emailRegex })}
        />
        {errors.email?.type === 'required' && (
          <p className={styles.validP}>이메일을 입력해주세요</p>
        )}
        {errors.email?.type === 'pattern' && (
          <p className={styles.validP}>이메일 양식에 맞게 입력해주세요</p>
        )}
        <br />
        비밀번호:
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register('password', { required: true, minLength: 8, pattern: passwordRegex })}
        />
        {errors.password?.type === 'required' && (
          <p className={styles.validP}>비밀번호를 입력해주세요</p>
        )}
        {errors.password?.type === 'pattern' && (
          <p className={styles.validP}>
            비밀번호는 문자와 숫자를 포함하여 8자리 이상 입력해야 합니다
          </p>
        )}
        {errors.password?.type === 'minLength' && (
          <p className={styles.validP}>
            비밀번호는 문자와 숫자를 포함하여 8자리 이상 입력해야 합니다.
          </p>
        )}
        <br />
        <button type="submit">로그인</button>
      </form>
      <button onClick={googleLoginHandler}> 구글 로그인 </button>
      <button onClick={kakaoLoginHandler}> 카카오 로그인 </button>
      <p>
        Puppy Ground가 처음이신가요?
        <span
          className={styles.moveLogin}
          onClick={() => {
            router.push('/auth/signup');
          }}
        >
          회원가입 하러가기
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
