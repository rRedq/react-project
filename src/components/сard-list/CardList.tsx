import React from 'react';
import { Context } from '../../shared/lib/context/context';
import { AppProps, RacesResponse } from '../../shared/types';
import { Card } from '../сard/Card';
import style from './CardList.module.scss';

export class CardList extends React.Component {
  render(): React.ReactNode {
    return (
      <div className={style.wrapper}>
        <Context.Consumer>
          {({ data }: AppProps) =>
            data && (
              <div className={style.container}>
                {data.map((item: RacesResponse, index: number) => (
                  <div key={index}>
                    <Card {...item} />
                  </div>
                ))}
              </div>
            )
          }
        </Context.Consumer>
      </div>
    );
  }
}
