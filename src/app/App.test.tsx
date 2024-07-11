import { render } from '@testing-library/react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

test('testing App', async () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const h1Text = getByText('Star Wars DB');
  expect(h1Text).toBeInTheDocument();
});
