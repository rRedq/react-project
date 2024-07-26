import React, { FC, useState } from 'react';
import {
  PlanetsResponse,
  SpeciesResponse,
  StarshipsResponse,
} from 'shared/types';
import { getImageUrl } from 'shared/lib/api';
import style from './Card.module.scss';
import placeholder from 'shared/assets/images/images/placeholder.jpg';
import {
  useAppDispatch,
  useAppSearchParams,
  useAppSelector,
} from 'shared/lib/hooks';
import { addItem, getOriginalItemsId, removeItem } from 'entities/Items';
import { getSearchProps } from 'entities/Search';
import Image from 'next/image';

type CardProps = SpeciesResponse | StarshipsResponse | PlanetsResponse;

const getId = (url: string) => {
  const parse = url.split('/');
  const itemIndex = 2;
  return parse[parse.length - itemIndex];
};

export const Card: FC<CardProps> = ({ url, name, ...rest }) => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(getSearchProps);
  const selectedItems = useAppSelector(getOriginalItemsId);
  const [imgSrc, setImgSrc] = useState<string>(getImageUrl(url));
  const { setSearchParamsByKey } = useAppSearchParams();
  const id = getId(url);
  const isChecked = selectedItems[category].includes(id);
  const keys: string[] = Object.keys(rest);
  const value: string[] = Object.values(rest);

  const openDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setSearchParamsByKey('DETAILS', id);
  };

  const toggleCheckbox = () => {
    if (!isChecked) dispatch(addItem({ category, item: { id, name, url } }));
    else dispatch(removeItem({ category, id }));
  };

  return (
    <div className={style.card} onClick={openDetails} data-testid="card">
      <div className={style.label}>
        <h2>{name}</h2>
        <input
          type="checkbox"
          onChange={toggleCheckbox}
          onClick={(e) => e.stopPropagation()}
          checked={isChecked}
          data-testid={name}
        />
      </div>
      <div className={style.content}>
        <div className={style.leftSide}>
          <Image
            className={style.img}
            src={imgSrc}
            alt={imgSrc}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '130px', height: 'auto' }}
            onError={() => setImgSrc(placeholder.src)}
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
