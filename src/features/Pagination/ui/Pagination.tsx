import { FC } from 'react';
import { CARD_ON_PAGE, DEFAULT_PAGE } from 'shared/consts';
import style from './Pagination.module.scss';
import { useAppSearchParams } from 'shared/lib/hooks';

interface PaginationProps {
  count: number;
}
export const Pagination: FC<PaginationProps> = ({ count }) => {
  const formattedCount: number = Math.ceil(count / CARD_ON_PAGE);
  const { getSearchParamsByKey, setSearchParamsByKey } = useAppSearchParams();
  const activePage = getSearchParamsByKey('PAGE') || DEFAULT_PAGE;
  const arrayFromCount = Array.from(
    { length: formattedCount },
    (_, i) => i + 1
  );

  const onClick = (page: number): void => {
    setSearchParamsByKey('PAGE', page.toString());
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
