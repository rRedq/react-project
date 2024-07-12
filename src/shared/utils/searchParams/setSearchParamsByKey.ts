import { SearchParams } from 'shared/types';

export const setSearchParamsByKey = (
  key: keyof typeof SearchParams,
  value: string | number,
  prevSearch: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(prevSearch.toString());
  params.set(SearchParams[key], value.toString());

  if (key === 'SEARCH') {
    if (!value) params.delete(SearchParams[key]);
  }

  console.log(params.get(SearchParams[key]));

  return params;
};
