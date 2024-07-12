import { FC } from 'react';
import style from './NotFound.module.scss';

export const NotFound: FC = () => {
  return <div className={style.wrapper}>{`Page hasn't been found`}</div>;
};
