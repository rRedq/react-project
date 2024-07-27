import { FC } from 'react';
import style from './NotFound.module.scss';

export const NotFound: FC = () => {
  return <div className={style.wrapper}>{`page hasn't been found`}</div>;
};
