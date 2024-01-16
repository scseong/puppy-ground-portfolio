'use client';

import { getProfile, updateUserProfile } from '@/apis/profile';
import useUserInfo from '@/hooks/useUserInfo';
import { supabase } from '@/shared/supabase/supabase';
import { Tables } from '@/shared/supabase/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import { useToast } from '@/hooks/useToast';

const Profile = () => {
  const {
    isLoading,
    isError,
    data: getProfileData
  } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
    refetchOnWindowFocus: false
  });
  const queryClient = useQueryClient();
  const updateUserNameMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
      setEditProfile(!editProfile);
      successTopRight({ message: '프로필이 업데이트 되었습니다!', timeout: 2000 });
    }
  });
  const { initialState } = useUserInfo();
  const [editProfile, setEditProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<Tables<'profiles'>>();
  const [profileImg, setProfileImg] = useState(userProfile?.avatar_url);
  const [imgFile, setImgFile] = useState<File>();
  const [editUserName, setEditUserName] = useState('');

  const fileInput = useRef<HTMLInputElement>(null);
  const { successTopRight, errorTopRight } = useToast();

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    if (e.target.files[0]) {
      setImgFile(e.target!.files[0]);
    } else {
      setProfileImg(userProfile?.avatar_url);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result?.toString() ?? '');
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditUserName(e.target.value);

  const updateProfile = async () => {
    let uploadUrl = profileImg!;
    try {
      if (imgFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile_avatar')
          .upload(`profile/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`, imgFile, {
            contentType: 'image/png'
          });

        const bucketName = 'profile_avatar';

        uploadUrl = `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/${bucketName}/${uploadData?.path}`;
        setProfileImg(uploadUrl);
      }

      updateUserNameMutation.mutate({
        user_name: editUserName,
        id: initialState.id!,
        avatar_url: uploadUrl
      });
    } catch (error) {
      if (error) errorTopRight({ message: '오류입니다', timeout: 2000 });
    }
  };

  useEffect(() => {
    //user 정보 가져오기
    const getProfile = async () => {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', initialState.id!)
        .returns<Tables<'profiles'>>()
        .single();
      console.log(profile);
      setUserProfile(profile!);
    };

    getProfile();
  }, []);

  if (isLoading) return <div>로딩 중입니다...</div>;
  if (isError) return <div>오류가 발생했습니다...</div>;
  return (
    <>
      {editProfile ? (
        <div>
          <div>
            <div>
              <div className={styles.imgLabel}>
                <Image
                  width={100}
                  height={100}
                  src={profileImg! || userProfile?.avatar_url!}
                  alt="유저 프로필"
                />
                <label htmlFor="input-file">사진 변경</label>
              </div>
              <input
                type="file"
                id="input-file"
                accept="image/jpg,image/png,image/jpeg"
                style={{ display: 'none' }}
                onChange={onChangeImg}
              />
              <input
                value={editUserName}
                onChange={onChangeUserName}
                placeholder="변경할 이름을 입력해주세요"
              />
              <button onClick={updateProfile}>수정 완료</button>
            </div>
            <button onClick={() => setEditProfile((state) => !state)}>취소</button>
            <div>중고거래</div>
            <div>멍스타그램</div>
          </div>
          <div>알림 설정</div>
        </div>
      ) : (
        <div>
          <div>
            <Image
              alt="유저 프로필"
              width={100}
              height={100}
              style={{ border: 'none' }}
              src={userProfile?.avatar_url || ''}
              onClick={() => {
                if (editProfile) fileInput.current!.click();
              }}
            />
            <p>{userProfile?.user_name}</p>
            <button onClick={() => setEditProfile((state) => !state)}>프로필 수정</button>
            <div>중고거래</div>
            <div>멍스타그램</div>
          </div>
          <div>알림 설정</div>
        </div>
      )}
    </>
  );
};

export default Profile;
