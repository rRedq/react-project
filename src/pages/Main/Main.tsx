import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { FC, useEffect, useState } from 'react';
import { getData } from 'shared/lib/api';
import { useMount, useUnmount } from 'shared/lib/hooks';
import { getLocalState, setLocalState } from 'shared/lib/localState';
import { Spinner } from 'shared/lib/ui/Spinner';
import { CombinedType, CategoriesType } from 'shared/types';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';

export const Main: FC = () => {
  const [data, setData] = useState<CombinedType>();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<CategoriesType>();
  const [search, setSearch] = useState<string>();

  const updateData = async (): Promise<void> => {
    setIsLoading(true);
    const data: CombinedType = await getData(search, category);
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
          {isLoading ? <Spinner /> : <> {data && <CardList data={data} />}</>}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
