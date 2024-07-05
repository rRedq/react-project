import { Component, ReactNode } from 'react';
import { RacesResponse } from 'shared/types';
import style from './CardList.module.scss';
import { Card } from 'features/Card';

interface CardListProps {
  data: RacesResponse[];
}

export class CardList extends Component<CardListProps> {
  render(): ReactNode {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          {this.props.data.map((item: RacesResponse, index: number) => (
            <Card {...item} key={index} />
          ))}
        </div>
      </div>
    );
  }
}
