import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { FC, useEffect, useState } from 'react';
import { getData } from 'shared/lib/api';
import { useMount } from 'shared/lib/hooks';
import { getLocalState } from 'shared/utils/localState';
import { Spinner } from 'shared/lib/ui/Spinner';
import {
  CategoriesType,
  BaseDataType,
  SearchProps,
  SearchParams,
} from 'shared/types';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Pagination } from 'features/Pagination';
import {
  getSearchParamsByKey,
  setSearchParamsObj,
} from 'shared/utils/searchParams';
import { DEFAULT_PAGE } from 'shared/consts';

export const Main: FC = () => {
  const [data, setData] = useState<BaseDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchProps, setSearchProps] = useState<SearchProps>();

  const updateData = async (): Promise<void> => {
    setIsLoading(true);

    const data: BaseDataType = await getData({
      search: searchProps?.search,
      category: searchProps?.category,
      page: searchProps?.page === DEFAULT_PAGE ? undefined : searchProps?.page,
    });

    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!searchProps) return;
    updateData();
  }, [searchProps]);

  useEffect(() => {
    const page = getSearchParamsByKey('PAGE', searchParams);
    const search = getSearchParamsByKey('SEARCH', searchParams);
    const category = getSearchParamsByKey(
      'CATEGORY',
      searchParams
    ) as CategoriesType;

    setSearchProps({
      ...searchProps,
      category,
      search: search || '',
      page: page || DEFAULT_PAGE,
    });
  }, [searchParams]);

  useMount(() => {
    const storedSearch: string | undefined = getLocalState('search');
    const storedCategory: CategoriesType =
      getLocalState('category') || 'species';

    const newState = new Map<keyof typeof SearchParams, string | number>();
    newState.set('PAGE', DEFAULT_PAGE);
    newState.set('SEARCH', storedSearch || '');
    newState.set('CATEGORY', storedCategory);
    const result = setSearchParamsObj(newState, searchParams);
    setSearchParams(result);
  });

  return (
    <>
      {searchProps && searchProps.category ? (
        <div className={`${style.app} ${style[searchProps.category]}`}>
          <Header />
          <Outlet />
          <CategoriesList activeCategory={searchProps.category} />
          <Search />
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {data && data.data && <CardList data={data.data} />}
              {data && data.count && <Pagination count={data.count} />}
            </>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
