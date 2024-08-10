import { Links, Meta, Outlet, Scripts, useParams } from '@remix-run/react';
import { CoreProvider } from 'core';
import { useEffect } from 'react';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { getLocalState } from 'shared/utils/localState';
import 'shared/styles/global.scss';
import { useAppSearchParams } from 'shared/lib/hooks';
import { SearchParams } from 'shared/types';
import { NotFound } from 'pages/NotFound/NotFound';
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/x-icon',
    },
  ];
};

export const ErrorBoundary = () => {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">
          <NotFound />
        </div>
        <Scripts />
      </body>
    </html>
  );
};

const App = () => {
  const { setSearchParamsByKey } = useAppSearchParams();
  const params = useParams();

  useEffect(() => {
    if (!params[SearchParams.CATEGORY]) {
      setSearchParamsByKey(
        'CATEGORY',
        getLocalState('category') || DEFAULT_CATEGORY
      );
    }
  }, []);

  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <CoreProvider>
        <body>
          <div id="root">
            <Outlet />
          </div>
          <Scripts />
        </body>
      </CoreProvider>
    </html>
  );
};

export default App;
