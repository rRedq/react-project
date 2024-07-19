import { FC } from 'react';
import './styles/global.scss';
import { ErrorBoundary } from 'shared/lib/ui/ErrorBoundary';
import { RouteProvider } from './providers/routerProvider';
import { Provider } from 'react-redux';
import { store } from './providers/storeProvider/config/store';
import { ThemeProvider } from './providers/themeProvider';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <RouteProvider />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
