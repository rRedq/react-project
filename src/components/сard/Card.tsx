import React from 'react';
import { RacesResponse } from '../../shared/types';
import { getImageUrl } from '../../shared/lib/api';
import style from './Card.module.scss';

export class Card extends React.Component<RacesResponse> {
  render(): React.ReactNode {
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
            <img className={style.img} src={getImageUrl(url)} />
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
