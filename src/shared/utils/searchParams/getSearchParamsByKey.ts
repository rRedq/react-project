import { SearchParams } from 'shared/types';

export const getSearchParamsByKey = (
  key: keyof typeof SearchParams,
  prevSearch: URLSearchParams
): string | null => {
  return prevSearch.get(SearchParams[key]);
};
