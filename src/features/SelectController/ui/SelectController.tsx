import { FC } from 'react';
import style from './SelectController.module.scss';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { clearItems, getSelectedItems } from 'entities/Items';
import { getItemsCsv, getItemsLength } from 'shared/utils/helpers';

export const SelectController: FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(getSelectedItems);
  const itemsCount = getItemsLength(selectedItems);

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
              href={getItemsCsv(selectedItems)}
              download={`${itemsCount}_selectedItems.csv`}
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
