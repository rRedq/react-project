import { FC } from 'react';
import { useTheme } from 'shared/lib/hooks';
import style from './ToggleThemeButton.module.scss';
import light from 'shared/assets/images/images/light.svg';
import dark from 'shared/assets/images/images/dark.svg';
import Image from 'next/image';

export const ToggleThemeButton: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${style.wrapper} ${style[theme]}`} onClick={toggleTheme}>
      <Image
        className={style.img}
        src={theme === 'light' ? light : dark}
        alt={theme}
        width={30}
        height={30}
      />
    </div>
  );
};
