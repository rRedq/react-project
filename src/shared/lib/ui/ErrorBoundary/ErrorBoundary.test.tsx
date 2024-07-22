import { BrowserRouter } from 'react-router-dom';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'app/App';

test('testing ErrorBoundary', async () => {
  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const errorBtn = getByText(/error/i);
  expect(errorBtn).toBeInTheDocument();
  await act(async () => await userEvent.click(errorBtn));

  const errorBoundaryText = getByText(/Sorry... there was an error/i);
  expect(errorBoundaryText).toBeInTheDocument();

  const reloadBtn = getByTestId(/reload/i);
  expect(reloadBtn).toBeInTheDocument();
});
