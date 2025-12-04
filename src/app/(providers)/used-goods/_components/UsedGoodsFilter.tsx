'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './usedGoodsFilter.module.scss';
import Select, { SingleValue, MultiValue, SelectInstance } from 'react-select';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useRouter } from 'next/navigation';
import { isEqual } from 'lodash-es';
import { multiOptions, singleOptions } from './config/selectConfig';
import { SearchParams } from '@/apis/goods';

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

const UsedGoodsFilter = ({ initialSearchParams }: { initialSearchParams?: SearchParams }) => {
  const { queryObject, generateQueryParameter } = useQueryParam();
  const mainSelectRef = useRef<SelectInstance<SelectOption, true>>(null);
  const subSelectRef = useRef<SelectInstance<SelectOption> | null>(null);
  const router = useRouter();

  const parseQueryParamsToSelectedOptions = useCallback((params: SearchParams) => {
    let currentSelectedMain: SelectOption[] | null = null;
    let currentSelectedSub: SelectOption | null = null;

    const { main, sub } = params;

    if (main) {
      const mainQueryValues = Array.isArray(main)
        ? main
        : typeof main === 'string' && main.includes('%')
          ? main.split('%')
          : main
            ? [main]
            : [];
      currentSelectedMain = mainCategory.filter((category) =>
        mainQueryValues.includes(category.value)
      );
      if (currentSelectedMain.length === 0) currentSelectedMain = null;
    }
    if (sub) {
      currentSelectedSub = subCategory.find((category) => category.value === sub) || null;
    }

    return { currentSelectedMain, currentSelectedSub };
  }, []);

  const { currentSelectedMain, currentSelectedSub } = parseQueryParamsToSelectedOptions(
    initialSearchParams || {}
  );
  const [selectedMain, setSelectedMain] = useState<SelectOption[] | null>(currentSelectedMain);
  const [selectedSub, setSelectedOption] = useState<SelectOption | null>(currentSelectedSub);

  useEffect(() => {
    const { currentSelectedMain: newMain, currentSelectedSub: newSub } =
      parseQueryParamsToSelectedOptions(queryObject);

    if (!isEqual(newMain, selectedMain)) {
      setSelectedMain(newMain);
    }
    if (!isEqual(newSub, selectedSub)) {
      setSelectedOption(newSub);
    }
  }, [queryObject, parseQueryParamsToSelectedOptions, selectedMain, selectedSub]);

  const handleMainSelect = useCallback(
    (newValue: MultiValue<SelectOption>) => {
      if (!newValue) return;
      mainSelectRef.current?.blur();
      router.push(
        generateQueryParameter(
          'main',
          newValue.map((option) => option.value)
        )
      );
    },
    [generateQueryParameter, router]
  );

  const handleSubSelect = useCallback(
    (newValue: SingleValue<SelectOption>) => {
      if (!newValue) return;
      subSelectRef.current?.blur();
      router.push(generateQueryParameter('sub', newValue.value));
    },
    [generateQueryParameter, router]
  );

  return (
    <div className={styles.wrapper}>
      <Select
        className={styles.customSelect}
        value={selectedSub}
        onChange={handleSubSelect}
        options={subCategory}
        placeholder="카테고리"
        styles={singleOptions}
        isSearchable={false}
        ref={subSelectRef}
      />
      <Select
        className={styles.customSelect}
        value={selectedMain}
        onChange={handleMainSelect}
        options={mainCategory}
        placeholder="견종 사이즈"
        isClearable={false}
        isSearchable={false}
        isMulti
        noOptionsMessage={() => <div>모든 견종 사이즈를 선택했습니다.</div>}
        styles={multiOptions}
        ref={mainSelectRef}
      />
    </div>
  );
};

export default UsedGoodsFilter;
