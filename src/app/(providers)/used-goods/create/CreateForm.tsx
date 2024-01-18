'use client';

import { createUsedGood } from '@/apis/used-goods/actions';
import { supabase } from '@/shared/supabase/supabase';
import { TablesInsert } from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { TbCameraCog } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import styles from './create.module.scss';
import { useToast } from '@/hooks/useToast';
import Swal from 'sweetalert2';
import useAuth from '@/hooks/useAuth';
import KakaoMapMarker from '@/app/_components/kakaoMap/KakaoMapMarker';
import { useAddress, usePosition } from '@/hooks/useKakaoMapMarker';

const bucketName = 'used_goods';
const MAINCATEGORY = ['대형견', '중형견', '소형견'];
const SUBCATEGORY = ['장난감', '식품', '의류', '기타'];

const CreateForm = () => {
  const { warnTopRight, errorTopRight } = useToast();

  const user = useAuth((state) => state.user);
  const position = usePosition((state) => state.position);
  const address = useAddress((state) => state.address);

  const [inputForm, setInputForm] = useState<TablesInsert<'used_item'>>({
    title: '',
    address: address,
    content: '',
    latitude: position.lat,
    longitude: position.lng,
    main_category_id: 0,
    sub_category_id: 0,
    photo_url: [],
    place_name: '',
    price: 0,
    sold_out: false,
    user_id: user?.id!
  });
  async function dropImage(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer?.files?.length ? e.dataTransfer?.files[0] : null;
    if (!file) return;

    await uploadImage(file);
  }

  async function addImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.length ? e.target.files[0] : null;
    if (!file) return;

    await uploadImage(file);
  }

  async function uploadImage(file: File) {
    if (file.size >= 2000000) {
      warnTopRight({ message: '파일 사이즈가 너무 큽니다. (2MB 이하)' });
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
      errorTopRight({ message: error?.message });
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

  const router = useRouter();

  const onClickCancel = () => {
    Swal.fire({
      title: '정말 취소하시겠습니까?',
      text: '입력하신 정보가 모두 사라집니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/used-goods');
      } else return;
    });
  };

  const onClickCreate = async () => {
    if (!inputForm.title) {
      warnTopRight({ message: '제목을 입력해주세요' });
      return;
    }
    if (!inputForm.content) {
      warnTopRight({ message: '내용을 입력해주세요' });
      return;
    }
    if (!inputForm.price) {
      warnTopRight({ message: '가격을 입력해주세요' });
      return;
    }
    if (!inputForm.main_category_id) {
      warnTopRight({ message: '견종 크기를 선택해주세요' });
      return;
    }
    if (!inputForm.sub_category_id) {
      warnTopRight({ message: '카테고리를 선택해주세요' });
      return;
    }
    if (!inputForm.photo_url || !inputForm.photo_url.length) {
      warnTopRight({ message: '사진을 선택해주세요' });
      return;
    }
    if (!inputForm.place_name) {
      warnTopRight({ message: '위치를 입력해주세요' });
      return;
    }

    Swal.fire({
      title: '등록하시겠습니까?',
      text: '입력하신 정보로 등록됩니다.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요'
    }).then((result) => {
      if (result.isConfirmed) {
        createUsedGood(inputForm);
        console.log('🚀 ~ onClickCreate ~ inputForm:', inputForm);
        router.push('/used-goods');
      } else return;
    });
  };

  useEffect(() => {
    setInputForm((prev) => ({
      ...prev,
      address: address,
      latitude: position.lat,
      longitude: position.lng
    }));
  }, [address, position]);

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
                  <label htmlFor="file" onDragOver={(e) => e.preventDefault()} onDrop={dropImage}>
                    <TbCameraCog size={27} />
                  </label>
                  <input id="file" type="file" accept=".gif, .jpg, .png" onChange={addImage} />
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
            {MAINCATEGORY.map((category, index) => (
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
            {SUBCATEGORY.map((category, index) => (
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
            <button className={styles.button} onClick={onClickCreate}>
              등록하기
            </button>
            <button className={styles.button} onClick={onClickCancel}>
              취소하기
            </button>
          </div>
        </div>
      </div>
      <KakaoMapMarker />
    </div>
  );
};

export default CreateForm;
