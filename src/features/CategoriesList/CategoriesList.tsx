import { Component, ReactNode } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';

const categoriesImg: string[] = [planets, starships, species];

export class CategoriesList extends Component {
  render(): ReactNode {
    return (
      <div className={style.wrapper}>
        {categoriesImg.map((img, index) => (
          <div className={style.imgContainer} key={index}>
            <img className={style.img} src={img} alt={convertUrlToLabel(img)} />
            <p className={style.text}>{convertUrlToLabel(img)}</p>
          </div>
        ))}
      </div>
    );
  }
}
