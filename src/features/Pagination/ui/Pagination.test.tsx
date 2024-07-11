import { Pagination } from './Pagination';
import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockCount = 43;
const expectedEmpty = '';
const expectedEqualToOne = '?page=1';
const expectedEqualToTwo = '?page=2';

test('testing Pagination component', async () => {
  const { getByText } = render(
    <BrowserRouter>
      <Pagination count={mockCount} />
    </BrowserRouter>
  );
  const firstPaginationItem = getByText(1);
  const secondPaginationItem = getByText(2);

  expect(firstPaginationItem).toBeInTheDocument();
  expect(secondPaginationItem).toBeInTheDocument();
  expect(location.search).toBe(expectedEmpty);

  await act(async () => await userEvent.click(secondPaginationItem));
  expect(location.search).toBe(expectedEqualToTwo);

  await act(async () => await userEvent.click(firstPaginationItem));
  expect(location.search).toBe(expectedEqualToOne);
});
