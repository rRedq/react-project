import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/Header';
import style from './Main.module.scss';

export const Main: FC = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.container}>
        <Outlet />
      </div>
    </div>
  );
};
