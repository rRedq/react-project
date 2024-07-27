import { FC } from 'react';
import style from './Header.module.scss';
import { useTheme } from 'shared/lib/hooks';

export const Header: FC = () => {
  const { theme } = useTheme();
  return (
    <div className={style.header}>
      <h1 className={`${style.logo} ${style[theme]}`}>Star Wars DB</h1>
    </div>
  );
};
