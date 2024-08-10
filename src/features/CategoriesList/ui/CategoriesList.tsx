import { FC, useEffect, useState } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';
import { setLocalState } from 'shared/utils/localState';
import { useAppSearchParams } from 'shared/lib/hooks';

const categoriesImg: string[] = [species, starships, planets];

export const CategoriesList: FC = () => {
  const { setSearchParamsByKey, getSearchParamsByKey } = useAppSearchParams();
  const category = getSearchParamsByKey('CATEGORY');
  const [value, setValue] = useState<CategoriesType>(category);

  useEffect(() => {
    if (value === category) return;
    setSearchParamsByKey('CATEGORY', value);
    setLocalState('category', value);
  }, [value]);

  return (
    <div className={style.wrapper}>
      {categoriesImg.map((img, index) => (
        <div
          className={`${style.imgContainer} ${category === convertUrlToLabel(img) ? style.active : style.common}`}
          key={index}
          data-testid={convertUrlToLabel(img)}
          onClick={() => setValue(convertUrlToLabel(img))}
        >
          <img
            className={style.img}
            src={img}
            alt={convertUrlToLabel(img)}
            data-testid="category"
          />
          <p className={style.text}>{convertUrlToLabel(img)}</p>
        </div>
      ))}
    </div>
  );
};
