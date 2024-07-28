import { useEffect, useState } from 'react';
import { DEFAULT_PAGE } from 'shared/consts';
import { useAppSearchParams, useAppSelector } from 'shared/lib/hooks';
import { SearchProps } from 'shared/types';
import { getSearchProps } from 'entities/Search';

export const useSearchQuery = () => {
  const { category, search } = useAppSelector(getSearchProps);
  const { getSearchParamsByKey, setSearchParamsByKey } = useAppSearchParams();
  const page = getSearchParamsByKey('PAGE');
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
    setSearchParamsByKey('PAGE', DEFAULT_PAGE);
    setSearchParamsByKey('DETAILS', undefined);
  }, [category, search]);

  useEffect(() => {
    if (searchProps.page === page || !page) return;
    setSearchProps({ ...searchProps, page });
  }, [page]);

  useEffect(() => {
    if (!page) setSearchParamsByKey('PAGE', DEFAULT_PAGE);
  }, []);

  return searchProps;
};
