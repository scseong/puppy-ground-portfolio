import { useSearchParams, usePathname } from 'next/navigation';

type QueryKeyword = 'soldout' | 'available';

export const useQueryParam = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryParameter = searchParams.toString();
  const queryObject = Object.fromEntries(searchParams);

  const isSoldout = 'soldout' in queryObject;

  const generateQueryParameter = (keyword: QueryKeyword) => {
    const prefix = queryParameter.length ? '&' : '';
    const reg = /&*soldout=true/g;
    const query = `${pathname}?${queryParameter}${prefix}soldout=true`;

    switch (keyword) {
      case 'soldout':
        return query;
      case 'available':
        return query.replace(reg, '');
      default:
        return queryParameter;
    }
  };

  return { isSoldout, pathname, queryParameter, queryObject, generateQueryParameter };
};
