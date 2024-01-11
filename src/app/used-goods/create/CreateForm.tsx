'use client';

import { createUsedGood } from '@/apis/used-goods/actions';
import { supabase } from '@/shared/supabase/supabase';
import { TablesInsert } from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { TbCameraCog } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import styles from './create.module.scss';

const bucketName = 'used_goods';
const mainCategory = ['대형견', '중형견', '소형견'];
const subCategory = ['장난감', '식품', '의류', '기타'];

const CreateForm = () => {
  const [inputForm, setInputForm] = useState<TablesInsert<'used_item'>>({
    title: '',
    address: '',
    content: '',
    latitude: '',
    longitude: '',
    main_category_id: 0,
    sub_category_id: 0,
    photo_url: [],
    place_name: '',
    price: 0,
    sold_out: false,
    user_id: '740bdd1e-8d81-45f6-938f-9ea2deba8d9e'
  });

  async function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.length ? e.target.files[0] : null;
    if (!file) return;

    if (inputForm.photo_url.length >= 4) {
      // 토스티파이 변경 예정
      alert('이미지는 4개까지만 등록 가능합니다.');
      return;
    }
    if (file.size >= 2000000) {
      // 토스티파이 변경 예정
      alert('파일 사이즈가 너무 큽니다. (2MB 이하)');
      return;
    }

    const { data, error } = await supabase.storage.from('used_goods').upload(uuidv4(), file);

    if (data) {
      setInputForm((prev) => ({
        ...prev,
        photo_url: [
          ...prev.photo_url,
          `${process.env.NEXT_PUBLIC_IMAGE_PREFIX}/${bucketName}/${data.path}`
        ]
      }));
    } else {
      console.log(error);
    }
  }

  const handleFormChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const removeImage = (index: number) => {
    setInputForm((prev) => ({
      ...prev,
      photo_url: prev.photo_url.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.imageBox}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className={styles.imageInput} key={index}>
              {inputForm.photo_url[index] ? (
                <>
                  {index === 0 ? <div className={styles.mainImage}>대표</div> : null}
                  <div className={styles.cancelIcon} onClick={() => removeImage(index)}>
                    <MdOutlineCancel size={20} />
                  </div>
                  <Image
                    src={inputForm.photo_url[index] || ''}
                    alt="image"
                    width={200}
                    height={200}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="file">
                    {' '}
                    <TbCameraCog size={27} />
                  </label>
                  <input id="file" type="file" accept=".gif, .jpg, .png" onChange={uploadImage} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.contentBox}>
          <input
            className={styles.input}
            placeholder="제목"
            name="title"
            onChange={handleFormChange}
          />
          <textarea
            className={styles.textarea}
            placeholder="제품 설명을 자세히 작성해주세요"
            name="content"
            onChange={handleFormChange}
          />
          <input
            className={styles.price}
            placeholder="가격"
            name="price"
            onChange={handleFormChange}
          />
          <div className={styles.category}>
            {mainCategory.map((category, index) => (
              <div className={styles.radio} key={index}>
                <input
                  type="radio"
                  name="main_category_id"
                  value={index + 1}
                  onChange={handleFormChange}
                />
                <label htmlFor="main_category_id">{category}</label>
              </div>
            ))}
          </div>
          <div className={styles.category}>
            {subCategory.map((category, index) => (
              <div className={styles.radio} key={index}>
                <input
                  type="radio"
                  name="sub_category_id"
                  value={index + 1}
                  onChange={handleFormChange}
                />
                <label htmlFor="sub_category_id">{category}</label>
              </div>
            ))}
          </div>
          <div className={styles.location}>
            <input
              className={styles.locationInput}
              placeholder="상세주소"
              name="place_name"
              onChange={handleFormChange}
            />
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.button} onClick={() => createUsedGood(inputForm)}>
              등록하기
            </button>
            <button className={styles.button}>취소하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
