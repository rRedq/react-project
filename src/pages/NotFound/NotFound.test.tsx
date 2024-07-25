import { NotFound } from './NotFound';
import { render } from '@testing-library/react';

test('testing NotFound', () => {
  const { getByText } = render(<NotFound />);

  const notFound = getByText(/Page hasn't been found/i);
  expect(notFound).toBeInTheDocument();
});
