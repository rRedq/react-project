import type { AppProps } from 'next/app';
import 'shared/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
