import { useRef, useCallback } from 'react';

const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  const timer = useRef<number | null>(null);

  // useCallback을 사용하여 함수가 다시 생성되는 것을 방지
  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;
