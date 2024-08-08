import { render } from '@testing-library/react';
import Home from 'app/page';
import mockRouter from 'next-router-mock';
import { Paths } from 'shared/types';
import { getLocalState, setLocalState } from 'shared/utils/localState';

beforeAll(() => {
  setLocalState('category', 'planets');
});

test('testing Home', () => {
  render(<Home />);

  const category = getLocalState('category');

  expect(mockRouter.pathname).toBe(`${Paths.MAIN}${category}`);
});
