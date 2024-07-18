import { FC } from 'react';
import style from './SelectController.module.scss';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { clearItems, getSelectedItems } from 'entities/Items';

export const SelectController: FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(getSelectedItems);

  const csvContent =
    'data:text/csv;charset=utf-8,' + JSON.stringify(selectedItems);

  const unSelectAllClick = () => {
    dispatch(clearItems());
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <a className={style.btn} onClick={unSelectAllClick}>
          Unselect all
        </a>
        <a
          className={style.btn}
          href={encodeURI(csvContent)}
          download="selectedItems.csv"
        >
          Download
        </a>
      </div>
    </div>
  );
};
