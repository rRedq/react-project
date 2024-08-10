import { useSearchParams, useParams, useNavigate } from '@remix-run/react';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { CategoriesType, Paths, SearchParams } from 'shared/types';

type IsCategoryType<T> = T extends 'CATEGORY'
  ? CategoriesType
  : string | undefined;

export const useAppSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  const getSearchParamsByKey = <T extends keyof typeof SearchParams>(
    key: T
  ): IsCategoryType<T> => {
    let result: string | undefined;
    switch (key) {
      case 'CATEGORY':
        result = params[SearchParams.CATEGORY] || DEFAULT_CATEGORY;
        break;
      case 'DETAILS':
        result = params[SearchParams.DETAILS];
        break;
      case 'PAGE':
      case 'SEARCH':
        result = searchParams.get(SearchParams[key]) || undefined;
        break;
      default:
        result = undefined;
    }
    return result as IsCategoryType<T>;
  };

  const setSearchParamsByKey = <T extends keyof typeof SearchParams>(
    key: T,
    value: IsCategoryType<T>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    switch (key) {
      case 'PAGE':
        if (!value) params.delete(SearchParams[key]);
        else params.set(SearchParams[key], value);
        setSearchParams(params);
        break;
      case 'SEARCH':
        params.delete(SearchParams.PAGE);
        if (!value) params.delete(SearchParams[key]);
        else params.set(SearchParams[key], value);
        setSearchParams(params);
        break;
      case 'CATEGORY':
        params.delete(SearchParams.PAGE);
        navigate(`${Paths.MAIN}${value}?${params.toString()}`);
        break;
      case 'DETAILS':
        if (value) {
          navigate(
            `${Paths.MAIN}${getSearchParamsByKey('CATEGORY')}/${value}?${params.toString()}`
          );
        } else {
          navigate(
            `${Paths.MAIN}${getSearchParamsByKey('CATEGORY')}?${params.toString()}`
          );
        }
        break;
    }
  };

  return { getSearchParamsByKey, setSearchParamsByKey };
};
