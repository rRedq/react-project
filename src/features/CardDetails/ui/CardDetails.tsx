import { FC } from 'react';
import style from './CardDetails.module.scss';
import { useGetDetailsDataQuery } from 'shared/lib/api';
import { Spinner } from 'shared/lib/ui/Spinner';
import { getSearchProps } from 'entities/Search';
import { useAppSearchParams, useAppSelector } from 'shared/lib/hooks';
import { useMemoDetails } from './hook/useMemoDetails';
import { DEFAULT_PAGE } from 'shared/consts';

export const CardDetails: FC = () => {
  const { category } = useAppSelector(getSearchProps);
  const { setSearchParamsByKey, getSearchParamsByKey } = useAppSearchParams();
  const card = getSearchParamsByKey('DETAILS') || DEFAULT_PAGE;
  const { data, isFetching } = useGetDetailsDataQuery({ category, card });
  const memoDetails = useMemoDetails(data);

  return (
    <div className={style.cover} data-testid="details">
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={style.wrapper}>
          <div
            className={style.close}
            onClick={() => setSearchParamsByKey('DETAILS', undefined)}
            data-testid="close"
          ></div>
          {memoDetails}
        </div>
      )}
    </div>
  );
};
