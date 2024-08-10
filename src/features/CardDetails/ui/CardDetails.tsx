import { FC } from 'react';
import style from './CardDetails.module.scss';
import { useAppSearchParams } from 'shared/lib/hooks';
import { useMemoDetails } from './hook/useMemoDetails';
import { CombinedTypeDetails } from 'shared/types';
import { useLoaderData } from '@remix-run/react';

export const CardDetails: FC = () => {
  const { setSearchParamsByKey } = useAppSearchParams();
  const data: CombinedTypeDetails = useLoaderData();
  const memoDetails = useMemoDetails(data);

  const closeDetails = () => {
    setSearchParamsByKey('DETAILS', undefined);
  };

  return (
    <div className={style.cover} data-testid="details">
      <div className={style.wrapper}>
        <div
          className={style.close}
          onClick={closeDetails}
          data-testid="close"
        ></div>
        {memoDetails}
      </div>
    </div>
  );
};
