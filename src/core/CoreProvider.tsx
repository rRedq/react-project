import { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'shared/lib/ui/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './providers/storeProvider/config/store';
import { ThemeProvider } from './providers/themeProvider';

interface CoreProviderProps {
  children: ReactNode;
}

export const CoreProvider: FC<CoreProviderProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
