import { Component, ReactNode } from 'react';
import style from './CategoriesList.module.scss';
import species from 'shared/assets/images/filters/species.jpg';
import starships from 'shared/assets/images/filters/starships.jpg';
import planets from 'shared/assets/images/filters/planets.jpg';
import { convertUrlToLabel } from 'shared/lib/dataConverters';
import { CategoriesType } from 'shared/types';

interface CategoriesListProps {
  activeCategory: CategoriesType;
  updateCategory: (category: CategoriesType) => void;
}

interface CategoriesListState {
  activeCategory: CategoriesType;
}

const categoriesImg: string[] = [species, starships, planets];

export class CategoriesList extends Component<
  CategoriesListProps,
  CategoriesListState
> {
  updateCategory = this.props.updateCategory;

  state: CategoriesListState = {
    activeCategory: this.props.activeCategory,
  };

  componentDidUpdate(nextProps: CategoriesListProps): void {
    if (nextProps.activeCategory === this.state.activeCategory) return;
    this.setState({ activeCategory: this.props.activeCategory });
  }

  render(): ReactNode {
    return (
      <div className={style.wrapper}>
        {categoriesImg.map((img, index) => (
          <div
            className={`${style.imgContainer} ${this.state.activeCategory === convertUrlToLabel(img) ? style.active : style.common}`}
            key={index}
            onClick={() => this.updateCategory(convertUrlToLabel(img))}
          >
            <img className={style.img} src={img} alt={convertUrlToLabel(img)} />
            <p className={style.text}>{convertUrlToLabel(img)}</p>
          </div>
        ))}
      </div>
    );
  }
}
