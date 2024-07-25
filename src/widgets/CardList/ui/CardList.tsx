import { FC, ReactNode } from 'react';
import style from './CardList.module.scss';
import { Card } from 'features/Card';
import { Spinner } from 'shared/lib/ui/Spinner';
import { Pagination } from 'features/Pagination';
import { useSearchQuery } from './hoook/useSearchQuery';
import { useGetDataQuery } from 'shared/lib/api';
import { CardDetails } from 'features/CardDetails';
import { useAppSearchParams } from 'shared/lib/hooks';

export const CardList: FC = () => {
  const searchQuery = useSearchQuery();
  const { data, isFetching } = useGetDataQuery(searchQuery);
  const { getSearchParamsByKey, setSearchParamsByKey } = useAppSearchParams();
  const details = getSearchParamsByKey('DETAILS');

  const closeDetails = () => {
    setSearchParamsByKey('DETAILS', undefined);
  };

  let content: ReactNode;

  if (isFetching) {
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
        <div>{details && <CardDetails card={details} />}</div>
      </div>
      {!isFetching && data && data.count && <Pagination count={data.count} />}
    </>
  );
};
