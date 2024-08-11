import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import App from 'app/root';
import MainPage from 'app/routes/home.$category';
import { CoreProvider } from 'core';
import { path } from 'shared/lib/__mock__';

test('a', async () => {
  const MockApp = createRemixStub([
    {
      path: '/',
      Component: App,
    },
    {
      path,
      Component: MainPage,
    },
  ]);

  render(
    <CoreProvider>
      <MockApp initialEntries={['/', path]} />
    </CoreProvider>
  );
});
