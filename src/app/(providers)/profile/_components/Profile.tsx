'use client';

import { getProfile, updateUserProfile } from '@/apis/profile/profile';
import { supabase } from '@/shared/supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import styles from './profile.module.scss';
import { useToast } from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import { CiCamera } from 'react-icons/ci';

const Profile = () => {
  const user = useAuth((state) => state.user);

  const { data: getProfileData, isLoading } = useQuery({
    queryKey: ['getProfile', user?.id],
    queryFn: () => getProfile(user!.id),
    enabled: !!user,
    refetchOnWindowFocus: false
  });

  const queryClient = useQueryClient();
  const updateUserNameMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
    }
  });

  const [editProfile, setEditProfile] = useState(false);
  const [profileImg, setProfileImg] = useState(getProfileData?.avatar_url);
  const [imgFile, setImgFile] = useState<File>();
  const [editUserName, setEditUserName] = useState(getProfileData?.user_name ?? '');

  const { successTopRight, errorTopRight, warnTopRight } = useToast();

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size >= 2000000) {
        warnTopRight({ message: '파일 사이즈가 너무 큽니다. (2MB 이하)' });
        return false;
      }
      setImgFile(e.target.files[0]);
    } else {
      setProfileImg(getProfileData?.avatar_url!);
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

  const clickEditProfile = () => {
    setEditUserName(getProfileData?.user_name!);
    setProfileImg(getProfileData?.avatar_url);
    setEditProfile(!editProfile);
  };

  const updateProfile = async () => {
    if (editUserName.length > 8)
      return warnTopRight({ message: '닉네임은 8자 이하로 입력해주세요!' });

    if (editUserName === getProfileData?.user_name && profileImg === getProfileData?.avatar_url) {
      return warnTopRight({ message: '변경된 사항이 없습니다!' });
    }
    let uploadUrl = profileImg!;
    try {
      if (imgFile) {
        const { data: uploadData, error } = await supabase.storage
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
        id: user?.id!,
        avatar_url: uploadUrl
      });

      setEditProfile(!editProfile);
      successTopRight({ message: '프로필이 업데이트 되었습니다!' });
    } catch (error) {
      if (error) errorTopRight({ message: '오류입니다. 다시 시도해주세요!' });
    }
  };

  if (isLoading) return <div></div>;
  if (!user) return <div></div>;

  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        {editProfile ? (
          <>
            <div className={styles.imgLabel}>
              <div className={styles.wrapper}>
                <Image
                  width={150}
                  height={150}
                  src={profileImg! || getProfileData?.avatar_url!}
                  alt="유저 프로필"
                />
                <label htmlFor="input-file">
                  <CiCamera size={27} />
                </label>
              </div>
              <div className={styles.userName}>{getProfileData?.user_name}</div>
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
                className={styles.nicNameInput}
              />
            </div>
            <button className={styles.update} onClick={updateProfile}>
              수정 완료
            </button>

            <button className={styles.cancel} onClick={() => setEditProfile((state) => !state)}>
              취소
            </button>
          </>
        ) : (
          <div className={styles.imgLabel}>
            <div className={styles.top}>
              <div className={styles.wrapper}>
                <Image
                  alt="유저 프로필"
                  width={150}
                  height={150}
                  style={{ border: 'none' }}
                  src={getProfileData?.avatar_url || ''}
                />
              </div>
              <div className={styles.userName}>{getProfileData?.user_name}</div>
            </div>
            <div className={styles.top}>
              <button className={styles.edit} onClick={clickEditProfile}>
                프로필 수정
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
