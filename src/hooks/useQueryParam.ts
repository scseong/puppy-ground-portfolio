import { useSearchParams, usePathname } from 'next/navigation';

type QueryKeyword = 'soldout' | 'available' | 'main' | 'sub' | 'page';

export const useQueryParam = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryParameter = searchParams.toString();
  const queryObject = Object.fromEntries(searchParams);

  const isSoldout = 'soldout' in queryObject;

  const generateQueryParameter = (keyword: QueryKeyword, payload?: string | string[]) => {
    let baseURL = pathname + '?';

    const queryString = new URLSearchParams(searchParams);

    switch (keyword) {
      case 'sub':
        queryString.set('sub', payload as string);
        queryString.delete('main');
        queryString.delete('page');
        queryString.delete('soldout');
        queryString.delete('query');
        break;
      case 'main':
        if (!Array.isArray(payload)) break;
        if (!payload.length) {
          queryString.delete('main');
          break;
        }
        queryString.set('main', payload.join('%'));
        queryString.delete('page');
        queryString.delete('soldout');
        queryString.delete('query');
        break;
      case 'soldout':
        if (!queryString.get('soldout')) {
          queryString.delete('page');
        }
        queryString.set('soldout', 'true');

        break;
      case 'available':
        if (queryString.get('soldout')) {
          queryString.delete('page');
        }
        queryString.delete('soldout');
        break;
      case 'page':
        queryString.set('page', payload as string);

      default:
    }
    return baseURL + queryString;
  };

  return { isSoldout, pathname, queryParameter, queryObject, generateQueryParameter };
};
