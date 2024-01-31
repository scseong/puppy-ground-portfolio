'use client';
import { useEffect, useState } from 'react';
import styles from './usedGoodsFilter.module.scss';
import Select, { SingleValue, MultiValue } from 'react-select';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useRouter } from 'next/navigation';
import { isEqual } from 'lodash';
import { multiOptions, singleOptions } from './config/selectConfig';

// TODO: CONSTANT -> API RESPONSE
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

const UsedGoodsFilter = () => {
  const [selectedMain, setSelectedMain] = useState<SelectOption[] | null>([]);
  const [selectedSub, setSelectedSub] = useState<SelectOption | null>(null);
  const { queryObject, generateQueryParameter } = useQueryParam();
  const router = useRouter();

  const handleMainSelect = (newValue: MultiValue<SelectOption>) => {
    if (!newValue) return;
    setSelectedMain([...newValue]);
    router.push(
      generateQueryParameter(
        'main',
        newValue.map((option) => option.value)
      )
    );
  };

  const handleSubSelect = (newValue: SingleValue<SelectOption>) => {
    if (!newValue) return;
    setSelectedSub(newValue);
    router.push(generateQueryParameter('sub', newValue.value));
  };

  useEffect(() => {
    const { main, sub } = queryObject;
    if (main) {
      const mainQuery = main?.includes('%') ? main?.split('%') : [main];
      const filtered = mainCategory.filter((category) => mainQuery.includes(category.value));

      if (!isEqual(filtered, selectedMain)) {
        setSelectedMain(filtered);
      }
    } else setSelectedMain(null);
    if (sub) setSelectedSub(subCategory.filter((category) => category.value === sub)[0]);
    else setSelectedSub(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryObject]);

  return (
    <div className={styles.wrapper}>
      <Select
        className={styles.customSelect}
        value={selectedSub ? selectedSub : null}
        onChange={handleSubSelect}
        options={subCategory}
        placeholder="카테고리"
        styles={singleOptions}
        isSearchable={false}
      />
      <Select
        className={styles.customSelect}
        value={selectedMain ? selectedMain : null}
        onChange={handleMainSelect}
        options={mainCategory}
        placeholder="견종 사이즈"
        isClearable={false}
        isSearchable={false}
        isMulti
        styles={multiOptions}
      />
    </div>
  );
};

export default UsedGoodsFilter;
