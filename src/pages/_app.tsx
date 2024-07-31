import { CoreProvider } from 'core/CoreProvider';
import { Metadata } from 'next';
import type { AppProps } from 'next/app';
import 'shared/styles/global.scss';

export const metadata: Metadata = {
  title: 'react project',
  description: 'Star Wars project',
  icons: {
    icon: '/icon.svg',
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CoreProvider>
      <Component {...pageProps} />
    </CoreProvider>
  );
};

export default App;
