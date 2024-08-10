import { render } from '@testing-library/react';
import { CoreProvider } from './CoreProvider';
import { BrowserRouter } from 'react-router-dom';

test('testing App', async () => {
  const { getByText } = render(
    <BrowserRouter>
      <CoreProvider />
    </BrowserRouter>
  );

  const h1Text = getByText(/Star Wars DB/i);
  expect(h1Text).toBeInTheDocument();
});
