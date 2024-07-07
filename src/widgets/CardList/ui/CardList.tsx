import { Component, ReactNode } from 'react';
import { CombinedType } from 'shared/types';
import style from './CardList.module.scss';
import { Card } from 'features/Card';

interface CardListProps {
  data: CombinedType;
}

export class CardList extends Component<CardListProps> {
  render(): ReactNode {
    const { data } = this.props;
    return (
      <div className={style.wrapper}>
        {data.length > 0 ? (
          <div className={style.container}>
            {data.map((item, index) => (
              <Card {...item} key={index} />
            ))}
          </div>
        ) : (
          <div className={style.emptyList}>
            We have been able to found nothing
          </div>
        )}
      </div>
    );
  }
}
