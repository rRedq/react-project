import { CategoriesList } from 'features/CategoriesList';
import { Search } from 'features/Search';
import { FC } from 'react';
import { CardList } from 'widgets/CardList';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';
import { useAppSearchParams, useTheme } from 'shared/lib/hooks';
import { SelectController } from 'features/SelectController';

export const Main: FC = () => {
  const { getSearchParamsByKey } = useAppSearchParams();
  const category = getSearchParamsByKey('CATEGORY');
  const { theme } = useTheme();

  return (
    <div className={`${style.app} ${style[category]}`} data-theme={theme}>
      <Header />
      <CategoriesList />
      <Search />
      <SelectController />
      <CardList />
    </div>
  );
};
