import { Component, ReactNode } from 'react';
import { ErrorState, VoidType } from 'shared/types';
import style from './ErrorButton.module.scss';

export class ErrorButton extends Component<VoidType, ErrorState> {
  state = {
    hasError: false,
  };

  onError = (): void => {
    this.setState({ hasError: true });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('Something has gone wrong');
    }

    return (
      <div className={style.btn} onClick={this.onError}>
        throw error
      </div>
    );
  }
}
