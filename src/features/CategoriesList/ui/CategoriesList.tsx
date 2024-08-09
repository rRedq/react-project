'use client';
import { FC, useEffect, useState } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';
import { setLocalState } from 'shared/utils/localState';
import { useAppSearchParams, useTheme } from 'shared/lib/hooks';
import Image, { StaticImageData } from 'next/image';
import { DEFAULT_CATEGORY } from 'shared/consts';

const categoriesImg: StaticImageData[] = [species, starships, planets];

export const CategoriesList: FC = () => {
  const { theme } = useTheme();
  const { getSearchParamsByKey, setSearchParamsByKey } = useAppSearchParams();
  const category = getSearchParamsByKey('CATEGORY') || DEFAULT_CATEGORY;
  const [value, setValue] = useState<CategoriesType>(category);

  useEffect(() => {
    if (value === category) return;
    setLocalState('category', value);
    setSearchParamsByKey('CATEGORY', value);
  }, [value]);

  return (
    <div className={style.wrapper}>
      {categoriesImg.map((img, index) => (
        <div
          className={`${style.imgContainer} ${category === convertUrlToLabel(img.src || img) ? style.active : style[`common-${theme}`]}`}
          key={index}
          data-testid={convertUrlToLabel(img.src || img)}
          onClick={() => setValue(convertUrlToLabel(img.src || img))}
        >
          <Image
            className={style.img}
            src={img}
            priority
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
