import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { FC, useEffect, useState } from 'react';
import { getData } from 'shared/lib/api';
import { getLocalState } from 'shared/utils/localState';
import { Spinner } from 'shared/lib/ui/Spinner';
import { CategoriesType, BaseDataType, SearchProps } from 'shared/types';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Pagination } from 'features/Pagination';
import {
  getSearchParamsByKey,
  setSearchParamsByKey,
} from 'shared/utils/searchParams';
import { DEFAULT_PAGE } from 'shared/consts';

export const Main: FC = () => {
  const [data, setData] = useState<BaseDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchProps, setSearchProps] = useState<SearchProps>();

  const updateData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response: BaseDataType = await getData({
        search: searchProps?.search,
        category: searchProps?.category || 'species',
        page:
          searchProps?.page === DEFAULT_PAGE ? undefined : searchProps?.page,
      });
      setData(response);
    } catch {
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = (value: CategoriesType): void => {
    if (searchProps?.category === value || isLoading) return;
    setSearchProps({ ...searchProps, category: value, page: DEFAULT_PAGE });
    const result = setSearchParamsByKey('PAGE', DEFAULT_PAGE, searchParams);
    setSearchParams(result);
  };

  const updateSearch = (value: string): void => {
    if (searchProps?.search === value || isLoading) return;
    setSearchProps({ ...searchProps, search: value, page: DEFAULT_PAGE });
    const result = setSearchParamsByKey('PAGE', DEFAULT_PAGE, searchParams);
    setSearchParams(result);
  };

  useEffect(() => {
    if (!searchProps) return;
    updateData();
  }, [searchProps]);

  useEffect(() => {
    const page = getSearchParamsByKey('PAGE', searchParams);
    if (page === searchProps?.page) return;

    setSearchProps({
      ...searchProps,
      page: page || DEFAULT_PAGE,
    });
  }, [searchParams]);

  useEffect(() => {
    const search: string | undefined = getLocalState('search');
    const category: CategoriesType = getLocalState('category') || 'species';
    const page = getSearchParamsByKey('PAGE', searchParams);

    if (!page) {
      const result = setSearchParamsByKey('PAGE', DEFAULT_PAGE, searchParams);
      setSearchParams(result);
    }

    setSearchProps({
      ...searchProps,
      category: category,
      page: page || undefined,
      search,
    });
  }, []);

  const closeDetails = () => {
    const props = setSearchParamsByKey('DETAILS', undefined, searchParams);
    setSearchParams(props);
  };

  if (!searchProps?.category) return <Spinner />;

  return (
    <div
      className={`${style.app} ${style[searchProps.category]}`}
      onClick={closeDetails}
    >
      <Header />
      <CategoriesList
        activeCategory={searchProps.category}
        updateCategory={updateCategory}
      />
      <Search updateSearch={updateSearch} />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={style.container} data-testid="container">
            <div className={style.cover} data-testid="cover">
              {data && data.data && <CardList data={data.data} />}
            </div>
            <div>
              {getSearchParamsByKey('DETAILS', searchParams) && <Outlet />}
            </div>
          </div>
          {data && data.count && <Pagination count={data.count} />}
        </>
      )}
    </div>
  );
};
