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

export type CardProps = SpeciesResponse | StarshipsResponse | PlanetsResponse;

const getId = (url: string) => {
  const parse = url.split('/');
  const itemIndex = 2;
  return parse[parse.length - itemIndex];
};

export const Card: FC<CardProps> = ({ url, name, ...rest }) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(getOriginalItemsId);
  const [imgSrc, setImgSrc] = useState<string>(getImageUrl(url));
  const { setSearchParamsByKey, getSearchParamsByKey } = useAppSearchParams();
  const category = getSearchParamsByKey('CATEGORY');
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
          <img
            className={style.img}
            src={imgSrc}
            onError={() => setImgSrc(placeholder)}
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
