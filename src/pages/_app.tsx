import { CoreProvider } from 'core/CoreProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'shared/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CoreProvider>
      <Head>
        <title>Star Wars DB</title>
        <meta name="description" content="Star Wars DB" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </CoreProvider>
  );
};

export default App;
