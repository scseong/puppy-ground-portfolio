'use client';

import ReactModal from 'react-modal';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { useToast } from '@/hooks/useToast';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/shared/supabase/supabase';
import Image from 'next/image';
import { TablesInsert } from '@/shared/supabase/types/supabase';
import useAuth from '@/hooks/useAuth';

type InputForm = TablesInsert<'mung_stagram'> & { inputValue: string };

const MungModal = () => {
  const user = useAuth(({ user }) => user);

  const [inputForm, setInputForm] = useState<InputForm>({
    title: '',
    tags: [],
    content: '',
    inputValue: '',
    user_id: user!.id ?? '',
    photo_url: []
  });
  const router = useRouter();
  const { warnTopRight, errorTopRight } = useToast();

  // TODO: input validation
  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const removeTag = (index: number) => {
    setInputForm((prev) => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { value: newTag } = e.currentTarget;

      if (newTag.trim()) {
        setInputForm((prev) => ({ ...prev, tags: [...prev.tags, newTag], inputValue: '' }));
      }
    }
  };

  const closeModal = () => {
    router.back();
  };

  const uploadImage = async (file: File) => {
    if (file.size >= 2_000_000) {
      warnTopRight({ message: '파일 사이즈가 너무 큽니다. (2MB 이하)' });
      return;
    }

    const { data, error } = await supabase.storage.from('mungstagram').upload(uuidv4(), file);

    if (data) {
      setInputForm((prev) => ({
        ...prev,
        photo_url: [
          ...prev.photo_url,
          `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/mungstagram/${data.path}`
        ]
      }));
    } else {
      errorTopRight({ message: error?.message });
    }
  };

  const dropImage = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer?.files?.length ? e.dataTransfer?.files[0] : null;
    if (!file) return;

    await uploadImage(file);
  };

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.length ? e.target.files[0] : null;
    if (!file) return;

    await uploadImage(file);
  };

  const removeImage = (index: number) => {
    setInputForm((prev) => ({
      ...prev,
      photo_url: prev.photo_url.filter((_, i) => i !== index)
    }));
  };

  // TODO: validation Check
  const handleSumbit = async () => {
    const { inputValue, ...mungstaInput } = inputForm;
    await supabase.from('mung_stagram').insert(mungstaInput).select();
  };

  return (
    <ReactModal
      className={styles.modal}
      isOpen={true}
      onRequestClose={closeModal}
      ariaHideApp={false}
      contentLabel="Modal"
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 10
        },
        content: {
          padding: 0,
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          borderRadius: '2rem',
          backgroundColor: 'white'
        }
      }}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <input
            type="text"
            name="title"
            onChange={handleFormChange}
            placeholder="제목 (최대 10자)"
            autoFocus
          />
        </div>
        <p className={styles.imageDescription}>* 이미지는 필수입니다 (최대 5장)</p>
        <div className={styles.imageBox}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.imageInput}>
              {inputForm.photo_url[index] && (
                <>
                  <div className={styles.cancelIcon} onClick={() => removeImage(index)}>
                    <MdOutlineCancel size={20} color="black" />
                  </div>
                  <Image
                    src={inputForm.photo_url[index] || ''}
                    alt="image"
                    sizes="160"
                    fill
                    priority
                  />
                </>
              )}
              {!inputForm.photo_url[index] && (
                <div>
                  <label htmlFor="file" onDragOver={(e) => e.preventDefault()} onDrop={dropImage}>
                    <FiPlus size={27} color="#B0B0B0" />
                  </label>
                  <input id="file" type="file" accept=".gif, .jpg, .png" onChange={addImage} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.tags}>
          <ul>
            {inputForm.tags.map((tag, idx) => (
              <li key={`${tag}-${idx}`} onClick={() => removeTag(idx)}>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.tagForm}>
          <input
            name="inputValue"
            value={inputForm.inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleFormChange}
            placeholder="해시태그로 작성해주세요 (최대 5개)"
            type="text"
          />
        </div>
        <div className={styles.content}>
          <textarea
            name="content"
            id="content"
            placeholder="내용 (최대 50자)"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.btnBox}>
          <button>취소</button>
          <button className={styles.submitBtn} onClick={handleSumbit}>
            등록하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default MungModal;
