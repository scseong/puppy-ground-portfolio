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

const MungModal = () => {
  const router = useRouter();
  const { warnTopRight, errorTopRight } = useToast();

  const closeModal = () => {
    router.back();
  };

  const [inputForm, setInputForm] = useState<{ photo_url: string[] }>({ photo_url: [] });


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
          <input type="text" placeholder="제목 (최대 10자)" autoFocus />
        </div>
        <p className={styles.imageDescription}>* 이미지는 필수입니다 (최대 5장)</p>

        <div className={styles.imageBox}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.imageInput}>
              {inputForm.photo_url[index] && (
                <>
                  <div className={styles.cancelIcon}>
                    <MdOutlineCancel size={20} color="#B0B0B0" />
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
                <>
                  <label htmlFor="file" >
                    <FiPlus size={27} color="#B0B0B0" />
                  </label>
                  <input id="file" type="file" accept=".gif, .jpg, .png"/>
                </>
              )}
            </div>
          ))}
        </div>
        <div className={styles.tags}>
          <ul>
            <li>#태그</li>
            <li>#태그</li>
            <li>#태그</li>
            <li>#태그</li>
            <li>#태그</li>
          </ul>
        </div>
        <div className={styles.tagForm}>
          <input type="text" placeholder="해시태그로 작성해주세요 (최대 5장)" />
        </div>
        <div className={styles.content}>
          <textarea name="content" id="content" placeholder="내용 (최대 50자)" />
        </div>
        <div className={styles.btnBox}>
          <button>취소</button>
          <button className={styles.submitBtn}>등록하기</button>
        </div>
      </div>
    </ReactModal>
  );
};

export default MungModal;
