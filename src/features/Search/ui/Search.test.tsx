import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import style from './Search.module.scss';
import { getLocalState } from 'shared/utils/localState';
import { CoreProvider } from 'core/CoreProvider';
import { Search } from './Search';

const testStr = 'test';
const anotherStr = 'cr';
const emptyStr = '';

test('testing Search component', async () => {
  const { getByPlaceholderText, getByText, getByAltText } = render(
    <CoreProvider>
      <Search />
    </CoreProvider>
  );

  const searchInput: HTMLElement = getByPlaceholderText(/search/i);
  const searchBtn: HTMLElement = getByAltText(/search/i);

  expect(searchInput).toBeInTheDocument();
  expect(getLocalState('search')).toBeUndefined();
  expect(searchInput).toHaveValue(emptyStr);
  expect(searchInput).toHaveClass(style.search);
  expect(searchBtn).toBeDefined();

  await act(async () => await userEvent.type(searchInput, `${testStr}{enter}`));
  expect(searchInput).toHaveValue(testStr);
  expect(getLocalState('search')).toBe(testStr);

  await act(async () => {
    await userEvent.type(searchInput, anotherStr);
  });
  expect(searchInput).toHaveValue(`${testStr}${anotherStr}`);
  const cancelBtn: HTMLElement = getByText(/X/i);

  expect(cancelBtn).toBeDefined();
  await act(async () => await cancelBtn.click());

  expect(searchInput).toHaveValue(emptyStr);
  expect(getLocalState('search')).toBe(emptyStr);

  await act(async () => await userEvent.type(searchInput, anotherStr));
  await act(async () => await searchBtn.click());
  expect(getLocalState('search')).toBe(anotherStr);

  await act(async () => await userEvent.type(searchInput, `${testStr}{enter}`));
  expect(searchInput).toHaveValue(`${anotherStr}${testStr}`);
  expect(getLocalState('search')).toBe(`${anotherStr}${testStr}`);
});
