import { Pagination } from './Pagination';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CoreProvider } from 'core/CoreProvider';
import mockRouter from 'next-router-mock';

const mockCount = 43;
const expectedEqualToOne = '1';
const expectedEqualToTwo = '2';

test('testing Pagination component', async () => {
  const { getByText } = render(
    <CoreProvider>
      <Pagination count={mockCount} />
    </CoreProvider>
  );
  const firstPaginationItem = getByText(1);
  const secondPaginationItem = getByText(2);

  expect(firstPaginationItem).toBeInTheDocument();
  expect(secondPaginationItem).toBeInTheDocument();
  expect(mockRouter.query.page).toBeUndefined();

  await act(async () => await userEvent.click(secondPaginationItem));
  expect(mockRouter.query.page).toBe(expectedEqualToTwo);

  await act(async () => await userEvent.click(firstPaginationItem));
  expect(mockRouter.query.page).toBe(expectedEqualToOne);
});
