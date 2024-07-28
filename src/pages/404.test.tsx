import { render } from '@testing-library/react';
import Custom404 from './404';

test('testing NotFound', () => {
  const { getByText } = render(<Custom404 />);

  const notFound = getByText(/Page hasn't been found/i);
  expect(notFound).toBeInTheDocument();
});
