import { FC, ReactNode } from 'react';
import style from './CardList.module.scss';
import { Card } from 'features/Card';
import { Spinner } from 'shared/lib/ui/Spinner';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
  getSearchParamsByKey,
  setSearchParamsByKey,
} from 'shared/utils/searchParams';
import { Pagination } from 'features/Pagination';
import { useSearchQuery } from '../hoook/useSearchQuery';
import { useGetDataQuery } from 'shared/lib/api';

export const CardList: FC = () => {
  const searchQuery = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetDataQuery(searchQuery);

  const closeDetails = () => {
    const props = setSearchParamsByKey('DETAILS', undefined, searchParams);
    setSearchParams(props);
  };

  let content: ReactNode;

  if (isLoading) {
    content = <Spinner />;
  } else if (data && data.data.length > 0) {
    content = (
      <div className={style.container} key={crypto.randomUUID()}>
        {data.data.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    );
  } else {
    content = (
      <div className={style.emptyList}>We have been able to find nothing</div>
    );
  }

  return (
    <>
      <div className={style.mainBlock} data-testid="container">
        <div className={style.cover} data-testid="cover" onClick={closeDetails}>
          <div className={style.wrapper}>{content}</div>
        </div>
        <div>{getSearchParamsByKey('DETAILS', searchParams) && <Outlet />}</div>
      </div>
      {data && data.count && <Pagination count={data.count} />}
    </>
  );
};
