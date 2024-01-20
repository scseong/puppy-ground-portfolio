import { useSearchParams, usePathname } from 'next/navigation';

type QueryKeyword = 'soldout' | 'available' | 'main' | 'sub' | 'page';

export const useQueryParam = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryParameter = searchParams.toString();
  const queryObject = Object.fromEntries(searchParams);

  const isSoldout = 'soldout' in queryObject;

  const generateQueryParameter = (keyword: QueryKeyword, payload?: string) => {
    const { main, sub, query, soldout, page } = Object.fromEntries(searchParams);
    const reg = /&*soldout=true/g;
    let baseURL = pathname + '?';

    switch (keyword) {
      case 'sub':
        return baseURL + `sub=${payload}`;
      case 'main':
        if (sub) return baseURL + `sub=${sub}&main=${payload}`;
        return baseURL + `main=${payload}`;
      case 'soldout':
        if (soldout) return baseURL + queryParameter;
        return baseURL + queryParameter + '&soldout=true';
      case 'available':
        return baseURL + queryParameter.replace(reg, '');
      case 'page':
      default:
        return queryParameter;
    }
  };

  return { isSoldout, pathname, queryParameter, queryObject, generateQueryParameter };
};
