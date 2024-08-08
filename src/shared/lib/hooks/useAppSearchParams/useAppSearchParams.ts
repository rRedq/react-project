'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CategoriesType, Paths, SearchParams } from 'shared/types';

type IsCategoryType<T> = T extends 'CATEGORY' ? CategoriesType : string;

export const useAppSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());

  const getSearchParamsByKey = <T extends keyof typeof SearchParams>(
    key: T
  ): IsCategoryType<T> | undefined => {
    let result: string | undefined | null;

    switch (key) {
      case 'CATEGORY':
        result = pathname?.split('/')[2];
        break;
      case 'DETAILS':
        result = pathname?.split('/')[3];
        break;
      case 'PAGE':
      case 'SEARCH':
        result = searchParams?.get(SearchParams[key]);
        break;
      default:
        result = null;
    }

    return result ? (result as IsCategoryType<T>) : undefined;
  };
  const setSearchParamsByKey = (
    key: keyof typeof SearchParams,
    value: string | undefined
  ) => {
    let path: string;

    switch (key) {
      case 'CATEGORY':
        path = `${Paths.MAIN}${value}`;
        break;
      case 'DETAILS':
        if (value)
          path = `${Paths.MAIN}${getSearchParamsByKey('CATEGORY')}/${value}?${params.toString()}`;
        else
          path = `${Paths.MAIN}${getSearchParamsByKey('CATEGORY')}?${params.toString()}`;
        break;
      case 'PAGE':
        if (value) {
          params.set(SearchParams[key], value);
          path = `${pathname}?${params.toString()}`;
        } else {
          params.delete(SearchParams[key]);
          path = `${pathname}?${params.toString()}`;
        }
        break;
      case 'SEARCH':
        if (value) {
          params.delete(SearchParams.PAGE);
          params.set(SearchParams[key], value);
          path = `${pathname}?${params.toString()}`;
        } else {
          params.delete(SearchParams[key]);
          path = `${pathname}?${params.toString()}`;
        }
        break;
      default:
        path = Paths.NOT_FOUND;
    }

    router.push(path);
  };

  return { getSearchParamsByKey, setSearchParamsByKey };
};
