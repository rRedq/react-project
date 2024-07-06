import { Component, ReactNode } from 'react';
import style from './Header.module.scss';

export class Header extends Component {
  render(): ReactNode {
    return (
      <div className={style.header}>
        <h1 className={style.logo}>Star Wars DB</h1>
      </div>
    );
  }
}
