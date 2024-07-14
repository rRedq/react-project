import { FC } from 'react';
import './styles/global.scss';
import { ErrorBoundary } from 'shared/lib/ui/ErrorBoundary';
import { RouteProvider } from './providers/routerProvider';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <RouteProvider />
    </ErrorBoundary>
  );
};
