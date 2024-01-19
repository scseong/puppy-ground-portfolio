'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import styles from './usedGoodsFilter.module.scss';
import Dropdown from './Dropdown';

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

const UsedGoodsFilter = () => {
  const [selected, setSelected] = useState({ main: new Set(), sub: new Set() });
  const { data } = useQuery<CategoryObject>({ queryKey: ['categories'], queryFn: getCategories });

  if (!data) return;

  return (
    // TODO: css 분리
    <div className={styles.wrapper}>
      <Dropdown categories={data.mainCategory} defaultText="견종 크기" />
      <Dropdown categories={data.subCategory} defaultText="카테고리" />
    </div>
  );
};

export default UsedGoodsFilter;
