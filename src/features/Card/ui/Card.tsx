import { FC } from 'react';
import { BaseDataType } from 'shared/types';
import style from './Card.module.scss';

interface CardProps {
  card: BaseDataType;
  animate: boolean;
}

export const Card: FC<CardProps> = ({ card, animate }) => {
  const { image } = card;
  const keys = Object.keys(card) as (keyof BaseDataType)[];
  const values = Object.values(card);

  return (
    <div className={`${style.wrapper} ${animate && style.animate}`}>
      <div className={style.leftSide}>
        <img src={image} alt="image" />
      </div>
      <div className={style.rightSide}>
        {keys.map((key, index) => {
          if (key === 'image') return;
          return (
            <p key={index}>
              <span>{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
              {key === 'term' ? (values[index] ? 'Yes' : 'No') : values[index]}
            </p>
          );
        })}
      </div>
    </div>
  );
};
