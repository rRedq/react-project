import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { FC, useEffect, useState } from 'react';
import { getData } from 'shared/lib/api';
import { useMount, useUnmount } from 'shared/lib/hooks';
import { getLocalState, setLocalState } from 'shared/utils/localState';
import { Spinner } from 'shared/lib/ui/Spinner';
import { CategoriesType, BaseDataType } from 'shared/types';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'features/Pagination';
import { getSearchParamsByKey } from 'shared/utils/searchParams';

export const Main: FC = () => {
  const [data, setData] = useState<BaseDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<CategoriesType>();
  const [search, setSearch] = useState<string>();
  const [searchParams] = useSearchParams();

  const updateData = async (page?: string): Promise<void> => {
    setIsLoading(true);
    const data: BaseDataType = await getData({ search, category, page });
    setData(data);
    setIsLoading(false);
  };

  const updateCategory = (value: CategoriesType): void => {
    if (category === value || isLoading) return;
    setCategory(value);
  };

  const updateSearch = (value: string): void => {
    if (search === value || isLoading) return;
    setSearch(value);
  };

  useEffect(() => {
    if (!category) return;
    updateData();
  }, [category, search]);

  useMount(() => {
    const storedSearch: string | undefined = getLocalState('search');
    const storedCategory: CategoriesType | undefined =
      getLocalState('category');

    storedCategory ? setCategory(storedCategory) : setCategory('species');
    if (storedSearch) setSearch(storedSearch);
  });

  useUnmount(() => {
    if (category) setLocalState('category', category);
    if (search !== undefined) setLocalState('search', search);
  });

  useEffect(() => {
    if (!searchParams.size) return;
    const pageNumber = getSearchParamsByKey('PAGE', searchParams);
    if (pageNumber) updateData(pageNumber);
  }, [searchParams]);

  return (
    <>
      {category ? (
        <div className={`${style.app} ${style[category]}`}>
          <Header />
          <CategoriesList
            updateCategory={updateCategory}
            activeCategory={category}
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
