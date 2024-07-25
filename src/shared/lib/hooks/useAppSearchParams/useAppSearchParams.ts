import { useSearchParams } from 'react-router-dom';
import { SearchParams } from 'shared/types';

export const useAppSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParamsByKey = (key: keyof typeof SearchParams) => {
    return searchParams.get(SearchParams[key]) || undefined;
  };

  const setSearchParamsByKey = (
    key: keyof typeof SearchParams,
    value: string | undefined
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined) params.delete(SearchParams[key]);
    else params.set(SearchParams[key], value);

    setSearchParams(params);
  };

  return { getSearchParamsByKey, setSearchParamsByKey };
};
