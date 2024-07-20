import { FC } from 'react';
import { useTheme } from 'shared/lib/hooks';
import style from './ToggleThemeButton.module.scss';
import light from 'shared/assets/images/images/light.svg';
import dark from 'shared/assets/images/images/dark.svg';

export const ToggleThemeButton: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={style.wrapper} onClick={toggleTheme}>
      <img src={theme === 'light' ? light : dark} alt={theme} />
    </div>
  );
};
