import { FC, useState } from 'react';
import style from './ErrorButton.module.scss';

export const ErrorButton: FC = () => {
  const [hasError, setError] = useState(false);

  if (hasError) throw new Error('Something has gone wrong');

  return (
    <div className={style.btn} onClick={() => setError(true)}>
      error
    </div>
  );
};
