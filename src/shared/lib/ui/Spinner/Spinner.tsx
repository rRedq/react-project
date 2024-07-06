import { Component, ReactNode } from 'react';
import style from './Spinner.module.scss';

export class Spinner extends Component {
  render(): ReactNode {
    return (
      <div className={style.wrapper}>
        <div className={style.spinner}></div>
      </div>
    );
  }
}
