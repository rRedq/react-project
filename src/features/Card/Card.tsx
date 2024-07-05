import { Component, ReactNode, SyntheticEvent } from 'react';
import { RacesResponse } from '../../shared/types';
import { getImageUrl } from '../../shared/lib/api';
import style from './Card.module.scss';
import planet from 'shared/assets/images/filters/planets.jpg';

export class Card extends Component<RacesResponse> {
  render(): ReactNode {
    const {
      url,
      name,
      language,
      average_lifespan,
      eye_colors,
      hair_colors,
      skin_colors,
    }: Readonly<RacesResponse> = this.props;

    return (
      <div className={style.card}>
        <h2>{name}</h2>
        <div className={style.content}>
          <div className={style.leftSide}>
            <img
              className={style.img}
              src={getImageUrl(url)}
              onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = planet;
              }}
            />
          </div>
          <div className={style.rightSide}>
            <p>
              <span>language: </span>
              {language}
            </p>
            <p>
              <span>avrage lifespan: </span> {average_lifespan}
            </p>
            <p>
              <span>eye color: </span> {eye_colors}
            </p>
            <p>
              <span>hair color: </span> {hair_colors}
            </p>
            <p>
              <span>skin color: </span> {skin_colors}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
