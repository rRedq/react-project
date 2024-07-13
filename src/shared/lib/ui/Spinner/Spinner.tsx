import { FC } from 'react';
import style from './Spinner.module.scss';

export const Spinner: FC = () => {
  return (
    <div className={style.wrapper} data-testid="spiner">
      <div className={style.spinner}></div>
    </div>
  );
};
