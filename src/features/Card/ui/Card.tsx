import { Component, ReactNode, SyntheticEvent } from 'react';
import {
  PlanetsResponse,
  SpeciesResponse,
  StarshipsResponse,
} from 'shared/types';
import { getImageUrl } from '../../../shared/lib/api';
import style from './Card.module.scss';
import placeholder from 'shared/assets/images/images/placeholder.jpg';

export class Card extends Component<
  SpeciesResponse | StarshipsResponse | PlanetsResponse
> {
  render(): ReactNode {
    const { name, url, ...rest } = this.props;
    const keys: string[] = Object.keys(rest);
    const value: string[] = Object.values(rest);

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
                target.src = placeholder;
              }}
            />
          </div>
          <div className={style.rightSide}>
            {keys.map((key, index) => (
              <p key={index}>
                <span>{key.split('_').join(' ')}: </span>
                {value[index]}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
