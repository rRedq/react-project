import { FC } from 'react';
import { CombinedType } from 'shared/types';
import style from './CardList.module.scss';
import { Card } from 'features/Card';

interface CardListProps {
  data: CombinedType;
}

export const CardList: FC<CardListProps> = ({ data }) => {
  return (
    <div className={style.wrapper}>
      {data.length > 0 ? (
        <div className={style.container}>
          {data.map((item, index) => (
            <Card {...item} key={index} />
          ))}
        </div>
      ) : (
        <div className={style.emptyList}>We have been able to find nothing</div>
      )}
    </div>
  );
};
