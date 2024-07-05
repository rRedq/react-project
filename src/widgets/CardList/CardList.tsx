import { Component, ReactNode } from 'react';
import { Context } from 'shared/lib/context/context';
import { AppProps, RacesResponse } from 'shared/types';
import style from './CardList.module.scss';
import { Card } from 'features/Card';

export class CardList extends Component {
  render(): ReactNode {
    return (
      <div className={style.wrapper}>
        <Context.Consumer>
          {({ data }: AppProps) =>
            data && (
              <div className={style.container}>
                {data.map((item: RacesResponse, index: number) => (
                  <Card {...item} key={index} />
                ))}
              </div>
            )
          }
        </Context.Consumer>
      </div>
    );
  }
}
