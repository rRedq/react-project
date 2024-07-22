import { ReactNode, Component, ErrorInfo } from 'react';
import { ErrorState } from 'shared/types';
import style from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Custom error boundry:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={style.wrapper}>
          <div className={style.container}>
            <h2>Sorry... there was an error</h2>
            <p>Please reload the page</p>
            <div className={style.btn} onClick={() => location.reload()}>
              reload
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
