import { FC, useEffect, useState } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';
import { useSearchParams } from 'react-router-dom';
import { setSearchParamsByKey } from 'shared/utils/searchParams';
import { setLocalState } from 'shared/utils/localState';

interface CategoriesListProps {
  activeCategory: CategoriesType;
}

const categoriesImg: string[] = [species, starships, planets];

export const CategoriesList: FC<CategoriesListProps> = ({ activeCategory }) => {
  const [category, setCategory] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!category) return;
    const params = setSearchParamsByKey(
      'CATEGORY',
      convertUrlToLabel(category),
      searchParams
    );
    setSearchParams(params);
    setLocalState('category', convertUrlToLabel(category));
  }, [category]);

  // const handler = () => {
  //   updateCategory(convertUrlToLabel(img));
  //   setSearchParamsByKey('SEARCH', value, searchParams);
  // };

  // setSearchParamsByKey(
  //   'CATEGORY',
  //   convertUrlToLabel(img),
  //   searchParams
  // )
  return (
    <div className={style.wrapper}>
      {categoriesImg.map((img, index) => (
        <div
          className={`${style.imgContainer} ${activeCategory === convertUrlToLabel(img) ? style.active : style.common}`}
          key={index}
          onClick={() => setCategory(img)}
        >
          <img className={style.img} src={img} alt={convertUrlToLabel(img)} />
          <p className={style.text}>{convertUrlToLabel(img)}</p>
        </div>
      ))}
    </div>
  );
};
