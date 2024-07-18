import { useMemo } from 'react';
import { CombinedTypeDetails } from 'shared/types';
import style from '../CardDetails.module.scss';

export const useMemoDetails = (data: CombinedTypeDetails | undefined) => {
  return useMemo(() => {
    if (!data) return;
    const keys: string[] = Object.keys(data);
    keys.splice(keys.indexOf('url'), 1);
    const value: string[] = Object.values(data);
    return (
      <div className={style.container}>
        {keys.map((key, index) => (
          <p key={index}>
            <span>{key.split('_').join(' ')}: </span>
            {value[index]}
          </p>
        ))}
      </div>
    );
  }, [data]);
};
