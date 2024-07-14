import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CARD_ON_PAGE } from 'shared/consts';
import {
  getSearchParamsByKey,
  setSearchParamsByKey,
} from 'shared/utils/searchParams';
import style from './Pagination.module.scss';

interface PaginationProps {
  count: number;
}
export const Pagination: FC<PaginationProps> = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const formattedCount: number = Math.ceil(count / CARD_ON_PAGE);
  const activePage = getSearchParamsByKey('PAGE', searchParams);
  const arrayFromCount = Array.from(
    { length: formattedCount },
    (_, i) => i + 1
  );

  const onClick = (value: number): void => {
    setSearchParams(
      setSearchParamsByKey('PAGE', value.toString(), searchParams)
    );
  };

  return (
    <div className={style.wrapper}>
      {arrayFromCount.map((key) => (
        <div
          key={key}
          className={`${style.cell} ${activePage === key.toString() ? style.active : null}`}
          onClick={() => onClick(key)}
        >
          {key}
        </div>
      ))}
    </div>
  );
};
