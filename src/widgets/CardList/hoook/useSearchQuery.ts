import { getSearchProps } from 'app/entities/Search';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_CATEGORY, DEFAULT_PAGE } from 'shared/consts';
import { useAppSelector } from 'shared/lib/hooks';
import { SearchProps } from 'shared/types';
import { getLocalState } from 'shared/utils/localState';
import {
  getSearchParamsByKey,
  setSearchParamsByKey,
} from 'shared/utils/searchParams';

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, search } = useAppSelector(getSearchProps);
  const page = getSearchParamsByKey('PAGE', searchParams);
  const initialProps: SearchProps = {
    category: getLocalState('category') || DEFAULT_CATEGORY,
    search: getLocalState('search'),
    page: page || DEFAULT_PAGE,
  };
  const [searchProps, setSearchProps] = useState<SearchProps>(initialProps);

  useEffect(() => {
    if (category === searchProps.category && search === searchProps.search) {
      return;
    }
    setSearchProps({ category, search, page: DEFAULT_PAGE });
    const result = setSearchParamsByKey('PAGE', DEFAULT_PAGE, searchParams);
    setSearchParams(result);
  }, [category, search]);

  useEffect(() => {
    console.log('page = ', page);
    if (searchProps.page === page) return;
    setSearchProps({ ...searchProps, page });
  }, [page]);

  useEffect(() => {
    if (!page) setSearchParams(page);
  }, []);

  return searchProps;
};
