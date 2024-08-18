import { getAnimation, getCards } from 'entities/Cards';
import { Card } from 'features/Card';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import style from './CardList.module.scss';

export const CardList: FC = () => {
  const cards = [...useSelector(getCards)].reverse();
  const animate = useSelector(getAnimation);
  console.log('animate = ', animate);

  return (
    <div className={style.wrapper}>
      {cards.length ? (
        <div className={style.cardList}>
          {cards.map((card, index) => (
            <Card key={index} card={card} animate={index === 0 && animate} />
          ))}
        </div>
      ) : (
        <>Nothing has been added yet</>
      )}
    </div>
  );
};
