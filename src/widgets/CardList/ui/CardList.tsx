import { getCards } from 'entities/Cards';
import { Card } from 'features/Card';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import style from './CardList.module.scss';

export const CardList: FC = () => {
  const cards = [...useSelector(getCards)].reverse();

  return (
    <div className={style.wrapper}>
      {cards.length ? (
        <div className={style.cardList}>
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
      ) : (
        <>Nothing has been added yet</>
      )}
    </div>
  );
};
