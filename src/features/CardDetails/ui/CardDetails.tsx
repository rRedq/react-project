import { FC } from 'react';
import style from './CardDetails.module.scss';
import { useSearchParams } from 'react-router-dom';
import {
  getSearchParamsByKey,
  setSearchParamsByKey,
} from 'shared/utils/searchParams';
import { useGetDetailsDataQuery } from 'shared/lib/api';
import { CategoriesType } from 'shared/types';
import { Spinner } from 'shared/lib/ui/Spinner';
import { getSearchProps } from 'app/entities/Search';
import { useAppSelector } from 'shared/lib/hooks';
import { DEFAULT_PAGE } from 'shared/consts';
import { useMemoDetails } from './hook/memoDetails';

export interface CardDetailsProps {
  card: string;
  category: CategoriesType;
}

export const CardDetails: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useAppSelector(getSearchProps);
  const card = getSearchParamsByKey('DETAILS', searchParams) || DEFAULT_PAGE;
  const { data, isFetching } = useGetDetailsDataQuery({ category, card });
  const memoDetails = useMemoDetails(data);

  const closeDetails = () => {
    const props = setSearchParamsByKey('DETAILS', undefined, searchParams);
    setSearchParams(props);
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
