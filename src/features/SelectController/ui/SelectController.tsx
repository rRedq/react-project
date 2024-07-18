import { FC } from 'react';
import style from './SelectController.module.scss';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { clearItems, getSelectedItems } from 'entities/Items';
import { getItemsLength } from 'shared/utils/helpers';
import { CSV_URL } from 'shared/consts';

export const SelectController: FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(getSelectedItems);
  const itemsCount = getItemsLength(selectedItems);

  const getUrl = () => {
    const csvContent = CSV_URL + JSON.stringify(selectedItems);
    return encodeURI(csvContent);
  };

  const unSelectAllClick = () => {
    dispatch(clearItems());
  };

  return (
    <div className={style.container}>
      {itemsCount > 0 && (
        <div className={style.wrapper}>
          <div className={style.label}>
            Selected items: <span>{itemsCount}</span>
          </div>
          <div className={style.btnCover}>
            <a className={style.btn} onClick={unSelectAllClick}>
              Unselect all
            </a>
            <a
              className={style.btn}
              href={getUrl()}
              download="selectedItems.csv"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
