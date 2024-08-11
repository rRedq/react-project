import { FC, ReactNode, useEffect, useState } from 'react';
import style from './CardList.module.scss';
import { Card } from 'features/Card';
import { Pagination } from 'features/Pagination';
import { useAppSearchParams } from 'shared/lib/hooks';
import { BaseDataType } from 'shared/types';
import Router from 'next/router';
import { Spinner } from 'shared/lib/ui/Spinner';

interface CardListProps {
  data: BaseDataType;
  children?: ReactNode;
}

export const CardList: FC<CardListProps> = ({ data, children }) => {
  const { setSearchParamsByKey } = useAppSearchParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  const closeDetails = () => {
    setSearchParamsByKey('DETAILS', undefined);
  };

  let content: ReactNode;
  if (loading) {
    content = <Spinner />;
  } else if (data.data.length > 0) {
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
        <div>{!loading && children}</div>
      </div>
      {data.count && <Pagination count={data.count} />}
    </>
  );
};
