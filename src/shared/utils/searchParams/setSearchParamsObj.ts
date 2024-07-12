import { SearchParams } from 'shared/types';

export const setSearchParamsObj = (
  obj: Map<keyof typeof SearchParams, string | number>,
  prevSearch: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(prevSearch.toString());
  // params.set(SearchParams[key], value.toString());

  // if (key === 'SEARCH') {
  //   if (!value) params.delete(SearchParams[key]);
  // }

  const search = obj.get('SEARCH');
  if (search) params.set(SearchParams['SEARCH'], search.toString());

  const page = obj.get('PAGE');
  if (page) params.set(SearchParams['PAGE'], page.toString());

  const category = obj.get('CATEGORY');
  if (category) params.set(SearchParams['CATEGORY'], category.toString());

  return params;
};
