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

    if (error) {
      errorTopRight({ message: '오류가 발생했습니다. 다시 시도해주세요', timeout: 2000 });
    }
  };

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

  return (
    <div className={styles.body}>
      <h1>로그인</h1>
      <form className={styles.form} onSubmit={handleSubmit(emailLoginHandler)}>
        <div>
          <input
            placeholder="이메일을 입력하세요"
            {...register('email', { required: true, pattern: emailRegex })}
          />
          {errors.email?.type === 'required' && <p> 이메일을 입력해주세요</p>}
          {errors.email?.type === 'pattern' && <p> 이메일 양식에 맞게 입력해주세요</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register('password', { required: true, minLength: 8, pattern: passwordRegex })}
          />
          {errors.password?.type === 'required' && <p>비밀번호를 입력해주세요</p>}
          {errors.password?.type === 'pattern' && (
            <p>비밀번호는 문자와 숫자를 포함하여 8자리 이상 입력해야 합니다</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p>비밀번호는 문자와 숫자를 포함하여 8자리 이상 입력해야 합니다.</p>
          )}
        </div>
        <button type="submit">로그인</button>
      </form>
      <div className={styles.buttonWrapper}>
        <button className={styles.kakaoBtn} onClick={kakaoLoginHandler}>
          카카오 로그인
        </button>
        <button className={styles.googleBtn} onClick={googleLoginHandler}>
          구글 로그인
        </button>
      </div>
      <p
        className={styles.moveLogin}
        onClick={() => {
          router.push('/auth/signup');
        }}
      >
        처음이신가요?
        <span> 회원가입 하러가기</span>
      </p>
    </div>
  );
};

export default LoginPage;
