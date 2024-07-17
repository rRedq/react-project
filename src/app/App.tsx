import { FC } from 'react';
import './styles/global.scss';
import { ErrorBoundary } from 'shared/lib/ui/ErrorBoundary';
import { RouteProvider } from './providers/routerProvider';
import { Provider } from 'react-redux';
import { store } from './providers/routerProvider/storeProvider/config/store';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouteProvider />
      </Provider>
    </ErrorBoundary>
  );
};
