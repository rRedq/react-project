import { FC, useEffect, useState } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';
import { getLocalState, setLocalState } from 'shared/utils/localState';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { getSearchProps, setCategory } from 'entities/Search';
import Image from 'next/image';

const categoriesImg: string[] = [species, starships, planets];

export const CategoriesList: FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(getSearchProps);
  const [value, setValue] = useState<CategoriesType>(category);

  useEffect(() => {
    const category = getLocalState('category');
    if (category) dispatch(setCategory(category));
  }, []);

  useEffect(() => {
    if (value === category) return;
    dispatch(setCategory(value));
    setLocalState('category', value);
  }, [value]);

  return (
    <div className={style.wrapper}>
      {categoriesImg.map((img, index) => (
        <div
          className={`${style.imgContainer} ${category === convertUrlToLabel(img.src || img) ? style.active : style.common}`}
          key={index}
          data-testid={convertUrlToLabel(img.src || img)}
          onClick={() => setValue(convertUrlToLabel(img.src || img))}
        >
          <Image
            className={style.img}
            src={img}
            alt={convertUrlToLabel(img.src || img)}
            data-testid="category"
            width={250}
            height={150}
          />
          <p className={style.text}>{convertUrlToLabel(img.src || img)}</p>
        </div>
      ))}
    </div>
  );
};
