'use client';
import { FC, ReactNode } from 'react';
import style from './CardList.module.scss';
import { Card } from 'features/Card';
import { Pagination } from 'features/Pagination';
import { useAppSearchParams } from 'shared/lib/hooks';
import { BaseDataType } from 'shared/types';

interface CardListProps {
  data: BaseDataType;
  children?: ReactNode;
}

export const CardList: FC<CardListProps> = ({ data, children }) => {
  const { setSearchParamsByKey } = useAppSearchParams();

  const closeDetails = () => {
    setSearchParamsByKey('DETAILS', undefined);
  };

  let content: ReactNode;
  if (data.data.length > 0) {
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
        <div>{children}</div>
      </div>
      {data.count && <Pagination count={data.count} />}
    </>
  );
};
