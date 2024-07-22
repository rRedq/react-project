import { getSearchProps } from 'entities/Search';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from 'shared/consts';
import { useAppSelector } from 'shared/lib/hooks';
import { SearchProps } from 'shared/types';
import {
  getSearchParamsByKey,
  setSearchParamsByKey,
} from 'shared/utils/searchParams';

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, search } = useAppSelector(getSearchProps);
  const page = getSearchParamsByKey('PAGE', searchParams);
  const initialState: SearchProps = {
    category,
    search,
    page: page || DEFAULT_PAGE,
  };
  const [searchProps, setSearchProps] = useState<SearchProps>(initialState);

  useEffect(() => {
    if (category === searchProps.category && search === searchProps.search) {
      return;
    }
    setSearchProps({ category, search, page: DEFAULT_PAGE });
    const result = setSearchParamsByKey('PAGE', DEFAULT_PAGE, searchParams);
    setSearchParams(result);
  }, [category, search]);

  useEffect(() => {
    if (searchProps.page === page) return;
    setSearchProps({ ...searchProps, page });
  }, [page]);

  useEffect(() => {
    if (!page) {
      const result = setSearchParamsByKey('PAGE', DEFAULT_PAGE, searchParams);
      setSearchParams(result);
    }
  }, []);

  return searchProps;
};
