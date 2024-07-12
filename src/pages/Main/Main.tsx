import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { FC, useEffect, useRef, useState } from 'react';
import { getData } from 'shared/lib/api';
import { useMount, useUnmount } from 'shared/lib/hooks';
import { getLocalState } from 'shared/utils/localState';
import { Spinner } from 'shared/lib/ui/Spinner';
import { CategoriesType, BaseDataType, SearchProps } from 'shared/types';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'features/Pagination';
import { getSearchParamsByKey } from 'shared/utils/searchParams';

export const Main: FC = () => {
  const [data, setData] = useState<BaseDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchProps, setSearchProps] = useState<SearchProps>();
  const isUnMount = useRef(false);

  const updateData = async (page?: string): Promise<void> => {
    setIsLoading(true);

    const data: BaseDataType = await getData({
      search: searchProps?.search,
      category: searchProps?.category,
      page,
    });

    setData(data);
    setIsLoading(false);
  };

  const updateCategory = (value: CategoriesType): void => {
    if (searchProps?.category === value || isLoading) return;
    setSearchProps({ ...searchProps, category: value });
  };

  const updateSearch = (value: string): void => {
    if (searchProps?.search === value || isLoading) return;
    setSearchProps({ ...searchProps, search: value });
  };

  useEffect(() => {
    if (!searchProps) return;
    updateData();
  }, [searchProps]);

  useEffect(() => {
    if (!searchParams.size) return;
    const pageNumber = getSearchParamsByKey('PAGE', searchParams);
    if (pageNumber) updateData(pageNumber);
  }, [searchParams]);

  useEffect(() => {
    if (!searchProps?.category) return;
    return () => {
      isUnMount.current = true;
    };
  }, []);

  useMount(() => {
    const storedSearch: string | undefined = getLocalState('search');
    const storedCategory: CategoriesType =
      getLocalState('category') || 'species';

    setSearchProps({ search: storedSearch || '', category: storedCategory });
  });

  useUnmount(isUnMount.current, searchProps);

  return (
    <>
      {searchProps && searchProps.category ? (
        <div className={`${style.app} ${style[searchProps.category]}`}>
          <Header />
          <CategoriesList
            updateCategory={updateCategory}
            activeCategory={searchProps.category}
          />
          <Search updateSearch={updateSearch} />
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
