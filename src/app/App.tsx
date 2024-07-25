import { FC } from 'react';
import './styles/global.scss';
import { ErrorBoundary } from 'shared/lib/ui/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './providers/storeProvider/config/store';
import { ThemeProvider } from './providers/themeProvider';
import { Main } from 'pages/main/Main';

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <Main />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
