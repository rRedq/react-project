import { SearchParams } from 'shared/types';

export const setSearchParamsByKey = (
  key: keyof typeof SearchParams,
  value: string | undefined,
  prevSearch: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(prevSearch.toString());

  if (value === undefined) params.delete(SearchParams[key]);
  else params.set(SearchParams[key], value);

  return params;
};
