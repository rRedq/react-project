import React, { FC, useState } from 'react';
import {
  PlanetsResponse,
  SpeciesResponse,
  StarshipsResponse,
} from 'shared/types';
import { getImageUrl } from 'shared/lib/api';
import style from './Card.module.scss';
import placeholder from 'shared/assets/images/images/placeholder.jpg';
import { setSearchParamsByKey } from 'shared/utils/searchParams';
import { useSearchParams } from 'react-router-dom';

type CardProps = SpeciesResponse | StarshipsResponse | PlanetsResponse;

export const Card: FC<CardProps> = ({ url, name, ...rest }) => {
  const [imgSrc, setImgSrc] = useState<string>(getImageUrl(url));
  const [searchParams, setSearchParams] = useSearchParams();
  const keys: string[] = Object.keys(rest);
  const value: string[] = Object.values(rest);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const parse = url.split('/');
    const categoryIndex = 3;
    const itemIndex = 2;
    const category = parse[parse.length - categoryIndex];
    const item = parse[parse.length - itemIndex];

    const result = setSearchParamsByKey(
      'DETAILS',
      `${category}/${item}`,
      searchParams
    );
    setSearchParams(result);
  };

  return (
    <div className={style.card} onClick={clickHandler}>
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
