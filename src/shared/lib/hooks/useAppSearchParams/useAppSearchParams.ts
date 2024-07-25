import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { SearchParams } from 'shared/types';

export const useAppSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getSearchParamsByKey = (key: keyof typeof SearchParams) => {
    return searchParams?.get(SearchParams[key]) || undefined;
  };

  const setSearchParamsByKey = (
    key: keyof typeof SearchParams,
    value: string | undefined
  ) => {
    if (key === 'DETAILS' && value === undefined) {
      const { details, ...rest } = router.query;
      details;

      router.push({
        pathname: router.pathname,
        query: { ...rest },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, [SearchParams[key]]: value },
      });
    }
  };

  return { getSearchParamsByKey, setSearchParamsByKey };
};
