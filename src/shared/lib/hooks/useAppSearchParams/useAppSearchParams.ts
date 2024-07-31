import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { CategoriesType, SearchParams } from 'shared/types';

type IsCategoryType<T> = T extends 'CATEGORY' ? CategoriesType : string;

export const useAppSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getSearchParamsByKey = <T extends keyof typeof SearchParams>(
    key: T
  ): IsCategoryType<T> | undefined => {
    let result: IsCategoryType<T> | undefined;
    if (key === 'CATEGORY') {
      result = router.query[SearchParams[key]] as IsCategoryType<T>;
    } else {
      result =
        (searchParams?.get(SearchParams[key]) as IsCategoryType<T>) ||
        undefined;
    }

    return result;
  };

  const setSearchParamsByKey = (
    key: keyof typeof SearchParams,
    value: string | undefined
  ) => {
    if (key === 'CATEGORY' && value) {
      const search = getSearchParamsByKey('SEARCH');
      if (search) {
        router.push({ query: { [SearchParams[key]]: value, search } });
      } else {
        router.push({ query: { [SearchParams[key]]: value } });
      }
    } else if (key === 'DETAILS' && !value) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { details, ...rest } = router.query;
      router.push({ query: { ...rest } });
    } else if (key === 'SEARCH') {
      if (value) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { page, ...rest } = router.query;
        router.push({ query: { ...rest, [SearchParams[key]]: value } });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { search, page, ...rest } = router.query;
        router.push({ query: { ...rest } });
      }
    } else {
      router.push({ query: { ...router.query, [SearchParams[key]]: value } });
    }
  };

  return { getSearchParamsByKey, setSearchParamsByKey };
};
