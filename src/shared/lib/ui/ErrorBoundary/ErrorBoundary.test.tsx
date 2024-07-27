import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CoreProvider } from 'core/CoreProvider';
import { Main } from 'pages/Main/Main';

test('testing ErrorBoundary', async () => {
  const { getByText, getByTestId } = render(
    <CoreProvider>
      <Main />
    </CoreProvider>
  );

  const errorBtn = getByText(/error/i);
  expect(errorBtn).toBeInTheDocument();
  await act(async () => await userEvent.click(errorBtn));

  const errorBoundaryText = getByText(/Sorry... there was an error/i);
  expect(errorBoundaryText).toBeInTheDocument();

  const reloadBtn = getByTestId(/reload/i);
  expect(reloadBtn).toBeInTheDocument();
});
