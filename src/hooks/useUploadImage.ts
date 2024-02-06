// useImageUpload.ts
import { useToast } from '@/hooks/useToast';
import { supabase } from '@/shared/supabase/supabase';

export const useUploadImage = () => {
  const { warnTopRight } = useToast();

  const uploadImage = async (file: File) => {
    try {
      const { data: uploadData } = await supabase.storage
        .from('profile_avatar')
        .upload(`profile/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`, file, {
          contentType: 'image/png'
        });

      const bucketName = 'profile_avatar';
      const uploadUrl = `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/${bucketName}/${uploadData?.path}`;
      return uploadUrl;
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      warnTopRight({ message: '이미지 업로드에 실패했습니다. 다시 시도해주세요.' });
      return null;
    }
  };

  return { uploadImage };
};
