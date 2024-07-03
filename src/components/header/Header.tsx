import React from 'react';
import style from './Header.module.scss';

export class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <div className={style.header}>
        <div className={style.logo}>Star Wars DB</div>
      </div>
    );
  }
}
