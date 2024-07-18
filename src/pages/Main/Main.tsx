import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { FC } from 'react';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';
import { getSearchProps } from 'entities/Search';
import { useAppSelector } from 'shared/lib/hooks';
import { SelectController } from 'features/SelectController';

export const Main: FC = () => {
  const { category } = useAppSelector(getSearchProps);

  return (
    <div className={`${style.app} ${style[category]}`}>
      <Header />
      <CategoriesList />
      <Search />
      <SelectController />
      <CardList />
    </div>
  );
};
