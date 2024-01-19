'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import styles from './usedGoodsFilter.module.scss';
import Select, { StylesConfig } from 'react-select';

type CategoryObject = {
  mainCategory: string[];
  subCategory: string[];
};

const mainCategoryQuery = supabase.from('main_category').select('*');
const subCategoryQuery = supabase.from('sub_category').select('*');

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

const main = [
  { value: '1', label: '대형견' },
  { value: '2', label: '중형견' },
  { value: '3', label: '소형견' }
];

const sub = [
  { value: '1', label: '장난감' },
  { value: '2', label: '식품' },
  { value: '3', label: '의류' },
  { value: '4', label: '기타' }
];

type Category = typeof main;
export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const colourStyles: StylesConfig<{ value: string; label: string }, true> = {
  option: (styles) => {
    return {
      ...styles,
      fontSize: '0.8rem'
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#0ac4b9',
      borderRadius: '15px',
      padding: '5px',
      color: 'white'
    };
  },
  multiValueLabel: (styles) => {
    return {
      ...styles,
      color: 'white'
    };
  },
  clearIndicator: (styles) => {
    return {
      ...styles,
      display: 'none'
    };
  },
  multiValueRemove: (styles) => {
    return {
      ...styles,
      backgroundColor: 'inherit',
      ':hover': {
        backgroundColor: 'inherit',
        cursor: 'pointer'
      }
    };
  }
};

const UsedGoodsFilter = () => {
  const [selectedMain, setSelectedMain] = useState<Category>([]);
  const [selectedSub, setSelectedSub] = useState<Category>([]);
  const { data } = useQuery<CategoryObject>({ queryKey: ['categories'], queryFn: getCategories });

  if (!data) return;

  return (
    // TODO: css 분리
    <div className={styles.wrapper}>
      <Select
        className={styles.customSelect}
        defaultValue={selectedMain}
        onChange={(newValue) => {
          setSelectedMain([...newValue]);
        }}
        options={main}
        placeholder="견종 사이즈"
        styles={colourStyles}
        isMulti
      />
      <Select
        className={styles.customSelect}
        defaultValue={selectedSub}
        onChange={(newValue) => {
          setSelectedSub([...newValue]);
        }}
        options={sub}
        placeholder="카테고리"
        styles={colourStyles}
        isMulti
      />
    </div>
  );
};

export default UsedGoodsFilter;
