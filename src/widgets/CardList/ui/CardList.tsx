import { FC, ReactNode } from 'react';
import style from './CardList.module.scss';
import { Card } from 'features/Card';
import { Spinner } from 'shared/lib/ui/Spinner';
import { Outlet, useNavigation } from 'react-router-dom';
import { Pagination } from 'features/Pagination';
import { useAppSearchParams } from 'shared/lib/hooks';
import { useLoaderData } from '@remix-run/react';
import { BaseDataType } from 'shared/types';

export const CardList: FC = () => {
  const data: BaseDataType = useLoaderData();
  const { state } = useNavigation();
  const isLoading = state === 'loading';
  const { setSearchParamsByKey } = useAppSearchParams();

  const closeDetails = () => {
    setSearchParamsByKey('DETAILS', undefined);
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
        <div>{!isLoading && <Outlet />}</div>
      </div>
      {data && data.count && <Pagination count={data.count} />}
    </>
  );
};
