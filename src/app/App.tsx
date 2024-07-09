import { FC, useEffect, useState } from 'react';
import { CategoriesType, CombinedType } from 'shared/types';
import { getData } from 'shared/lib/api';
import './styles/global.scss';
import { CategoriesList } from 'features/CategoriesList';
import { Header } from 'widgets/Header';
import { Search } from 'features/Search';
import { CardList } from 'widgets/CardList';
import style from './styles/App.module.scss';
import { getLocalState, setLocalState } from 'shared/lib/localState';
import { Spinner } from 'shared/lib/ui/Spinner';
import { ErrorBoundary } from 'shared/lib/ui/ErrorBoundary';

export const App: FC = () => {
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
    const storedSearch: string | undefined = getLocalState('search');
    const storedCategory: CategoriesType | undefined =
      getLocalState('category');
    category ? setCategory(storedCategory) : setCategory('species');
    if (storedSearch) setSearch(storedSearch);
  }, []);

  useEffect(() => {
    if (!category) return;
    updateData();

    return () => {
      if (search) setLocalState('search', search);
      if (category) setLocalState('category', category);
    };
  }, [category, search]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};
