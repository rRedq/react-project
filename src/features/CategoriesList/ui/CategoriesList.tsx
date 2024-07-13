import { FC, useEffect, useState } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';
import { setLocalState } from 'shared/utils/localState';

interface CategoriesListProps {
  activeCategory: CategoriesType;
  updateCategory: (value: CategoriesType) => void;
}

const categoriesImg: string[] = [species, starships, planets];

export const CategoriesList: FC<CategoriesListProps> = ({
  activeCategory,
  updateCategory,
}) => {
  const [category, setCategory] = useState<CategoriesType>(activeCategory);

  useEffect(() => {
    if (category === activeCategory) return;
    updateCategory(category);
    setLocalState('category', category);
  }, [category]);

  return (
    <div className={style.wrapper}>
      {categoriesImg.map((img, index) => (
        <div
          className={`${style.imgContainer} ${activeCategory === convertUrlToLabel(img) ? style.active : style.common}`}
          key={index}
          onClick={() => setCategory(convertUrlToLabel(img))}
        >
          <img className={style.img} src={img} alt={convertUrlToLabel(img)} />
          <p className={style.text}>{convertUrlToLabel(img)}</p>
        </div>
      ))}
    </div>
  );
};
