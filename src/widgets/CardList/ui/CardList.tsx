import { Component, ReactNode } from 'react';
import { CombinedType } from 'shared/types';
import style from './CardList.module.scss';
import { Card } from 'features/Card';

interface CardListProps {
  data: CombinedType;
}

export class CardList extends Component<CardListProps> {
  render(): ReactNode {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          {this.props.data.map((item, index: number) => (
            <Card {...item} key={index} />
          ))}
        </div>
      </div>
    );
  }
}
