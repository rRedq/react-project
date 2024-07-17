import { SearchParams } from 'shared/types';

export const getSearchParamsByKey = (
  key: keyof typeof SearchParams,
  prevSearch: URLSearchParams
): string | undefined => {
  return prevSearch.get(SearchParams[key]) || undefined;
};
