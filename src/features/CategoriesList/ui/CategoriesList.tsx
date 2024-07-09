import { FC } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';

interface CategoriesListProps {
  activeCategory: CategoriesType;
  updateCategory: (value: CategoriesType) => void;
}

const categoriesImg: string[] = [species, starships, planets];

export const CategoriesList: FC<CategoriesListProps> = ({
  activeCategory,
  updateCategory,
}) => {
  return (
    <div className={style.wrapper}>
      {categoriesImg.map((img, index) => (
        <div
          className={`${style.imgContainer} ${activeCategory === convertUrlToLabel(img) ? style.active : style.common}`}
          key={index}
          onClick={() => updateCategory(convertUrlToLabel(img))}
        >
          <img className={style.img} src={img} alt={convertUrlToLabel(img)} />
          <p className={style.text}>{convertUrlToLabel(img)}</p>
        </div>
      ))}
    </div>
  );
};
