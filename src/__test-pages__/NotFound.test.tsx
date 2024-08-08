import { render } from '@testing-library/react';
import NotFound from 'app/not-found';

test('testing NotFound', () => {
  const { getByText } = render(<NotFound />);

  const title = getByText(/page hasn't been found/i);
  expect(title).toBeInTheDocument();
});
