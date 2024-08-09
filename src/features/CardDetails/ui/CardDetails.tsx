'use client';
import { FC } from 'react';
import style from './CardDetails.module.scss';
import { useAppSearchParams, useTheme } from 'shared/lib/hooks';
import { useMemoDetails } from './hook/useMemoDetails';
import { CombinedTypeDetails } from 'shared/types';

interface CardDetailsProps {
  data: CombinedTypeDetails;
}

export const CardDetails: FC<CardDetailsProps> = ({ data }) => {
  const { theme } = useTheme();
  const { setSearchParamsByKey } = useAppSearchParams();
  const memoDetails = useMemoDetails(data);

  return (
    <div className={style.cover} data-testid="details">
      <div className={style[`wrapper-${theme}`]}>
        <div
          className={style[`close-${theme}`]}
          onClick={() => setSearchParamsByKey('DETAILS', undefined)}
          data-testid="close"
        ></div>
        {memoDetails}
      </div>
    </div>
  );
};
