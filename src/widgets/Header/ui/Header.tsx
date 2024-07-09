import { FC } from 'react';
import style from './Header.module.scss';

export const Header: FC = () => {
  return (
    <div className={style.header}>
      <h1 className={style.logo}>Star Wars DB</h1>
    </div>
  );
};
