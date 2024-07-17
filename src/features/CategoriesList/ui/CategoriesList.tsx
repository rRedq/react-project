import { FC, useEffect, useState } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';
import { setLocalState } from 'shared/utils/localState';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { getSearchProps, setCategory } from 'app/entities/Search';

const categoriesImg: string[] = [species, starships, planets];

export const CategoriesList: FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(getSearchProps);
  const [value, setValue] = useState<CategoriesType>(category);

  useEffect(() => {
    if (value === category) return;
    dispatch(setCategory(value));
    setLocalState('category', value);
  }, [value]);

  return (
    <div className={style.wrapper}>
      {categoriesImg.map((img, index) => (
        <div
          className={`${style.imgContainer} ${category === convertUrlToLabel(img) ? style.active : style.common}`}
          key={index}
          data-testid="category"
          onClick={() => setValue(convertUrlToLabel(img))}
        >
          <img className={style.img} src={img} alt={convertUrlToLabel(img)} />
          <p className={style.text}>{convertUrlToLabel(img)}</p>
        </div>
      ))}
    </div>
  );
};
