import { FC } from 'react';
import style from './CardDetails.module.scss';
import { useGetDetailsDataQuery } from 'shared/lib/api';
import { Spinner } from 'shared/lib/ui/Spinner';
import { getSearchProps } from 'entities/Search';
import { useAppSearchParams, useAppSelector } from 'shared/lib/hooks';
import { DEFAULT_PAGE } from 'shared/consts';
import { useMemoDetails } from './hook/useMemoDetails';

export const CardDetails: FC = () => {
  const { category } = useAppSelector(getSearchProps);
  const { setSearchParamsByKey, getSearchParamsByKey } = useAppSearchParams();
  const card = getSearchParamsByKey('DETAILS') || DEFAULT_PAGE;
  const { data, isFetching } = useGetDetailsDataQuery({ category, card });
  const memoDetails = useMemoDetails(data);

  const closeDetails = () => {
    setSearchParamsByKey('DETAILS', undefined);
  };

  return (
    <div className={style.cover} data-testid="details">
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={style.wrapper}>
          <div
            className={style.close}
            onClick={closeDetails}
            data-testid="close"
          ></div>
          {memoDetails}
        </div>
      )}
    </div>
  );
};
