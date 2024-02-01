'use client';

import ReactModal from 'react-modal';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { useToast } from '@/hooks/useToast';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/shared/supabase/supabase';
import Image from 'next/image';
import { TablesInsert } from '@/shared/supabase/types/supabase';
import useAuth from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import { customStyle } from '@/shared/modal';

import { useForm, SubmitHandler } from 'react-hook-form';

type FileEvent = React.ChangeEvent<HTMLInputElement> & {
  target: EventTarget & { files: FileList };
};

// type Inputs = TablesInsert<'mung_stagram'> & { inputValue: string };
type Inputs = {
  content: string;
  files: File[];
  tag: string;
  title: string;
};

const MAX_IMAGE_COUNT = 5;
const ONE_MEGABYTE = 1_048_576;

const getImagePreview = (file: File) => {
  if (!file) return;
  return URL.createObjectURL(file);
};

const isFileSizeExceeded = (file: File, limit: number) => {
  if (file.size > limit) return true;
  return false;
};

const isDuplicateImage = (files: File[], newFile: File) => {
  return files.some((file) => file.name === newFile.name);
};

const MungstaCreateModal = () => {
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const user = useAuth((state) => state.user);
  const { warnTopRight } = useToast();
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      files: []
    }
  });
  const files = watch('files');

  const uploadMultiFiles = (e: FileEvent) => {
    const newFiles = e.target.files;

    if (newFiles.length + files.length > MAX_IMAGE_COUNT) {
      warnTopRight({
        message: `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드 가능합니다.`
      });
      return;
    }

    const filteredFiles = Array.from(newFiles).filter((file) => {
      const fileSizeExceeded = isFileSizeExceeded(file, ONE_MEGABYTE * 2);
      if (fileSizeExceeded) {
        warnTopRight({
          message: `${file.name}의 파일 사이즈가 너무 큽니다. (2MB 이하)`,
          timeout: 3000
        });
        return;
      }

      if (isDuplicateImage(files, file)) {
        warnTopRight({ message: `${file.name} 이미 추가된 파일입니다.` });
        return;
      }

      return file;
    });

    const uploadFiles = [...files, ...filteredFiles];
    const previews = uploadFiles
      .map((file) => getImagePreview(file))
      .filter((url): url is string => url !== undefined);
    setValue('files', uploadFiles);
    setImagePreview(previews);
  };

  const removeTag = (index: number) => {
    setTags((tags) => tags.filter((_, i) => i !== index));
  };

  const removeImage = (index: number) => {
    setValue(
      'files',
      files.filter((_, i) => i !== index)
    );
    setImagePreview((images) => images.filter((_, i) => i !== index));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      const { value } = e.currentTarget;
      setTags((prev) => [...prev, value]);
      setValue('tag', '');
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <ReactModal
      className={styles.modal}
      isOpen={true}
      // onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Modal"
      style={customStyle}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.title}>
          <input {...register('title')} placeholder="제목을 입력하세요 (최대 14자)" autoFocus />
        </div>
        <p className={styles.imageDescription}>이미지는 필수입니다 (최대 5장, 2MB 이하)</p>
        <div className={styles.imageBox}>
          {Array.from({ length: MAX_IMAGE_COUNT }).map((_, index) => (
            <div key={index} className={styles.imageInput}>
              {files.length > index ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  src={imagePreview[index]}
                  alt="preview"
                  onClick={() => removeImage(index)}
                />
              ) : (
                <div>
                  <label htmlFor="file">
                    <FiPlus size={27} color="#B0B0B0" />
                  </label>
                  <input
                    {...register('files')}
                    id="file"
                    type="file"
                    accept=".gif, .jpg, .png"
                    multiple
                    onChange={uploadMultiFiles}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.tags}>
          <ul>
            {tags &&
              tags.map((tag, index) => (
                <li key={`${tag}-${index}`} onClick={() => removeTag(index)}>
                  #{tag}
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.tagForm}>
          <input
            {...register('tag')}
            onKeyDown={handleTagInputKeyDown}
            placeholder="해시태그를 입력하세요 (최대 5개, 각 해시태그는 6글자 이내 입력 후 Enter 키를 누르세요)"
            type="text"
          />
        </div>
      </form>
    </ReactModal>
  );
};

export default MungstaCreateModal;
