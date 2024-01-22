import { useSearchParams, usePathname } from 'next/navigation';

type QueryKeyword = 'soldout' | 'available' | 'main' | 'sub' | 'page';

export const useQueryParam = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryParameter = searchParams.toString();
  const queryObject = Object.fromEntries(searchParams);

  const isSoldout = 'soldout' in queryObject;

  const generateQueryParameter = (keyword: QueryKeyword, payload?: string) => {
    let baseURL = pathname + '?';

    const queryString = new URLSearchParams(searchParams);

    switch (keyword) {
      case 'sub':
        queryString.set('sub', payload!);
        queryString.delete('main');
        queryString.delete('page');
        queryString.delete('soldout');
        queryString.delete('query');
        break;
      case 'main':
        queryString.set('main', payload!);
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
        queryString.set('page', payload!);

      default:
    }
    return baseURL + queryString;
  };

  return { isSoldout, pathname, queryParameter, queryObject, generateQueryParameter };
};
