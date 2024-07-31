import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CoreProvider } from 'core/CoreProvider';
import Category from 'pages/[category]/[[...details]]';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { resultWithFiveItems } from 'shared/lib/__mock__/data';
import mockRouter from 'next-router-mock';

beforeAll(() => {
  mockRouter.push({
    query: { category: DEFAULT_CATEGORY },
  });
});

test('testing ErrorBoundary', async () => {
  const { getByText, getByTestId } = render(
    <CoreProvider>
      <Category data={resultWithFiveItems} details={null} />
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
