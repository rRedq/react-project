import { FC, ReactNode } from 'react';
import './styles/global.scss';
import { ErrorBoundary } from 'shared/lib/ui/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './providers/storeProvider/config/store';
import { ThemeProvider } from './providers/themeProvider';

interface AppProps {
  children: ReactNode;
}

export const App: FC<AppProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
