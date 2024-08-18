import { FC, useEffect, useState } from 'react';
import style from './PasswordProgress.module.scss';
import { checkPasswordStrength } from 'shared/utils';

interface PasswordProgressProps {
  password?: string;
}

const getColor = (value: number) => {
  if (value <= 40) return 'red';
  else if (value < 66) return 'yellow';
  else if (value < 99) return 'orange';
  else return 'green';
};

export const PasswordProgress: FC<PasswordProgressProps> = ({ password }) => {
  const [value, setValue] = useState<number>();

  useEffect(() => {
    (async () => {
      setValue(await checkPasswordStrength(password));
    })();
  }, [password]);

  if (value === undefined) return <div className={style.progress} />;

  return (
    <div className={style[`progress-${getColor(value)}`]}>
      <progress max="100" value={value} />
    </div>
  );
};
