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
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { addItem, getSelectedItems, removeItem } from 'app/entities/Items';
import { getSearchProps } from 'app/entities/Search';

type CardProps = SpeciesResponse | StarshipsResponse | PlanetsResponse;

const getId = (url: string) => {
  const parse = url.split('/');
  const itemIndex = 2;
  return parse[parse.length - itemIndex];
};

export const Card: FC<CardProps> = ({ url, name, ...rest }) => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(getSearchProps);
  const selectedItems = useAppSelector(getSelectedItems);
  const [imgSrc, setImgSrc] = useState<string>(getImageUrl(url));
  const [searchParams, setSearchParams] = useSearchParams();
  const id = getId(url);
  const isChecked = selectedItems[category].includes(id);
  const keys: string[] = Object.keys(rest);
  const value: string[] = Object.values(rest);

  const openDetails = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const result = setSearchParamsByKey('DETAILS', id, searchParams);
    setSearchParams(result);
  };

  const toggleCheckbox = () => {
    if (!isChecked) dispatch(addItem({ category, item: id }));
    else dispatch(removeItem({ category, item: id }));
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
