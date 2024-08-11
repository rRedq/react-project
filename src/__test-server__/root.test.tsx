import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import App, { ErrorBoundary } from 'app/root';
import MainPage from 'app/routes/home.$category';
import { CoreProvider } from 'core';
import { path } from 'shared/lib/__mock__';
import { Paths } from 'shared/types';

test('a', async () => {
  const MockApp = createRemixStub([
    {
      path: '/',
      Component: App,
    },
    {
      path: Paths.NOT_FOUND,
      Component: ErrorBoundary,
    },
    {
      path,
      Component: MainPage,
    },
  ]);

  render(
    <CoreProvider>
      <MockApp initialEntries={['/', Paths.NOT_FOUND, path]} />
    </CoreProvider>
  );
});
