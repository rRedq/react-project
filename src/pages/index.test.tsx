import { render } from '@testing-library/react';
import Home from 'pages';

test('testing Home page', async () => {
  const { getByText } = render(<Home />);

  const h1Text = getByText(/Star Wars DB/i);
  expect(h1Text).toBeInTheDocument();
});
