import { render } from '@testing-library/react';
import Home from 'pages';
import mockRouter from 'next-router-mock';
import { DEFAULT_CATEGORY } from 'shared/consts';

test('testing Home page', async () => {
  render(<Home />);

  expect(mockRouter.pathname).toBe(`/${DEFAULT_CATEGORY}`);
});
