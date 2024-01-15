'use client';

import { getProfile, updateUserName } from '@/apis/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

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
    mutationFn: updateUserName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
    }
  });

  const [editProfile, setEditProfile] = useState(false);
  const [userName, setUserName] = useState('');

  const updateName = () => {
    updateUserNameMutation.mutate({ name: userName, userId: '' });
  };

  if (isLoading) return <div>로딩 중입니다...</div>;
  if (isError) return <div>오류가 발생했습니다...</div>;
  return (
    <>
      {editProfile ? (
        <div>
          <div>
            <div>
              {/* Image 태그로 변경 예정 */}
              이미지
              <p>이름</p>
              <button onClick={() => setEditProfile((state) => !state)}>프로필 수정</button>
              <div>중고거래</div>
              <div>멍스타그램</div>
            </div>
            <div>알림 설정</div>
          </div>
          <div>
            {/* Image 태그로 변경 예정 */}
            원래 이미지
            <input placeholder="변경할 이름을 입력해주세요" />
            <button>수정 완료</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            이미지
            <p>이름</p>
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
