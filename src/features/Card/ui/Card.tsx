import { FC, useState } from 'react';
import {
  PlanetsResponse,
  SpeciesResponse,
  StarshipsResponse,
} from 'shared/types';
import { getImageUrl } from 'shared/lib/api';
import style from './Card.module.scss';
import placeholder from 'shared/assets/images/images/placeholder.jpg';

type CardProps = SpeciesResponse | StarshipsResponse | PlanetsResponse;

export const Card: FC<CardProps> = ({ url, name, ...rest }) => {
  const [imgSrc, setImgSrc] = useState<string>(getImageUrl(url));
  const keys: string[] = Object.keys(rest);
  const value: string[] = Object.values(rest);

  return (
    <div className={style.card}>
      <h2>{name}</h2>
      <div className={style.content}>
        <div className={style.leftSide}>
          <img
            className={style.img}
            src={imgSrc}
            onError={() => setImgSrc(placeholder)}
            alt={url}
          />
        </div>
        <div className={style.rightSide}>
          {keys.map((key, index) => (
            <p key={index}>
              <span>{key.split('_').join(' ')}: </span>
              {value[index]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
