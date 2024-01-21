'use client';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import styles from './usedGoodsFilter.module.scss';
import { SingleValue, StylesConfig } from 'react-select';
import CustomSelect from './CustomSelect';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useRouter } from 'next/navigation';

type CategoryObject = {
  mainCategory: string[];
  subCategory: string[];
};

const mainCategoryQuery = supabase.from('main_category').select('*');
const subCategoryQuery = supabase.from('sub_category').select('*');

// TODO: API 응답 받아 처리
const getCategories = async (): Promise<CategoryObject> => {
  const response = await Promise.all([mainCategoryQuery, subCategoryQuery]);
  const categoryArray: string[][] = response.map((res) => {
    if (!res.data) return [];
    return res.data.map((category) => category.name);
  });

  return categoryArray.reduce((acc, cur, idx) => {
    if (idx === 0) {
      acc['mainCategory'] = cur;
    } else if (idx === 1) {
      acc['subCategory'] = cur;
    }
    return acc;
  }, {} as CategoryObject);
};

const mainCategory = [
  { value: '1', label: '대형견' },
  { value: '2', label: '중형견' },
  { value: '3', label: '소형견' }
];

const subCategory = [
  { value: '1', label: '장난감' },
  { value: '2', label: '식품' },
  { value: '3', label: '의류' },
  { value: '4', label: '기타' }
];

type SelectOption = (typeof mainCategory)[number];

const customStyles: StylesConfig<{ value: string; label: string }, false> = {
  option: (styles, { isSelected }) => ({
    ...styles,
    color: isSelected ? '#0ac4a9' : '#333',
    backgroundColor: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0.5rem 1rem',
    '&:hover': {
      color: '#0ac4a9'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    cursor: 'pointer',
    borderColor: isFocused ? '#0ac4a9' : '#979797',

    fontSize: '13px',
    lineHeight: '1rem',
    boxShadow: isFocused ? '0 0 0 1px #0ac4a9' : undefined,
    height: '100%',
    '&:hover': {
      color: '#333'
    },
    '&:focus': {
      border: '#0ac4a9'
    }
  })
};

const UsedGoodsFilter = () => {
  const selectInputRef = useRef(null);
  const { isSoldout, queryParameter, queryObject, generateQueryParameter } = useQueryParam();
  const [selectedMain, setSelectedMain] = useState<SelectOption | null>(null);
  const [selectedSub, setSelectedSub] = useState<SelectOption | null>(null);
  // const { data } = useQuery<CategoryObject>({ queryKey: ['categories'], queryFn: getCategories });
  // if (!data) return;
  const router = useRouter();

  useEffect(() => {
    const { main, sub } = queryObject;
    if (main) setSelectedMain(mainCategory.filter((category) => category.value === main)[0]);
    else setSelectedMain(null);
    if (sub) setSelectedSub(subCategory.filter((category) => category.value === sub)[0]);
    else setSelectedSub(null);
  }, [queryObject]);

  const handleMainSelect = (newValue: SingleValue<SelectOption>) => {
    if (!newValue) return;
    setSelectedMain(newValue);
    router.push(generateQueryParameter('main', newValue.value));
  };

  const handleSubSelect = (newValue: SingleValue<SelectOption>) => {
    if (!newValue) return;
    setSelectedSub(newValue);
    router.push(generateQueryParameter('sub', newValue.value));
  };

  return (
    <div className={styles.wrapper}>
      <CustomSelect
        className={styles.customSelect}
        value={selectedSub ? selectedSub : null}
        onChange={handleSubSelect}
        options={subCategory}
        placeholder="카테고리"
        styles={customStyles}
      />
      <CustomSelect
        className={styles.customSelect}
        value={selectedMain ? selectedMain : null}
        onChange={handleMainSelect}
        options={mainCategory}
        placeholder="견종 사이즈"
        styles={customStyles}
      />
    </div>
  );
};

export default UsedGoodsFilter;
