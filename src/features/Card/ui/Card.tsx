import { Component, ReactNode } from 'react';
import {
  PlanetsResponse,
  SpeciesResponse,
  StarshipsResponse,
} from 'shared/types';
import { getImageUrl } from 'shared/lib/api';
import style from './Card.module.scss';
import placeholder from 'shared/assets/images/images/placeholder.jpg';

type CardProps = SpeciesResponse | StarshipsResponse | PlanetsResponse;

interface CardState {
  imgSrc: string;
}

export class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = { imgSrc: getImageUrl(props.url) };
  }

  handleError = (): void => {
    this.setState({ imgSrc: placeholder });
  };

  render(): ReactNode {
    const { name, url, ...rest } = this.props;
    const { imgSrc } = this.state;
    const keys: string[] = Object.keys(rest);
    const value: string[] = Object.values(rest);

    return (
      <div className={style.card}>
        <h2>{name}</h2>
        <div className={style.content}>
          <div className={style.leftSide}>
            <img
              className={style.img}
              src={imgSrc}
              onError={this.handleError}
              alt={url}
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
