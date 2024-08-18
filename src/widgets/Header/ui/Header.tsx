import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paths } from 'shared/types';
import style from './Header.module.scss';

export const Header: FC = () => {
  const path = useLocation().pathname;

  return (
    <div className={style.wrapper}>
      <h1>Forms</h1>
      <div className={style.buttonCover}>
        <Link
          className={path === Paths.MAIN ? style.active : style.btn}
          to={Paths.MAIN}
        >
          Main
        </Link>
        <Link
          className={
            path.slice(1) === Paths.UNCONTROLLED ? style.active : style.btn
          }
          to={Paths.UNCONTROLLED}
        >
          Uncontrolled
        </Link>
        <Link
          className={
            path.slice(1) === Paths.CONTROLLED ? style.active : style.btn
          }
          to={Paths.CONTROLLED}
        >
          Controlled
        </Link>
      </div>
    </div>
  );
};
