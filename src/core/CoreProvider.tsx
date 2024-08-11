import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './providers/storeProvider/config/store';
import { ThemeProvider } from './providers/themeProvider';

interface AppProps {
  children: ReactNode;
}

export const CoreProvider: FC<AppProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
