import { render } from '@testing-library/react';
import Custom404 from 'pages/404';

test('testing page 404', () => {
  const { getByText } = render(<Custom404 />);

  const notFound = getByText(/Page hasn't been found/i);
  expect(notFound).toBeInTheDocument();
});
