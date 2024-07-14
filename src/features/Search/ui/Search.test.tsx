import { vi } from 'vitest';
import { Search } from './Search';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import style from './Search.module.scss';
import { getLocalState, setLocalState } from 'shared/utils/localState';

const mockUpdateSearch = vi.fn();

const testStr = 'test';
const anotherStr = 'cr';
const emptyStr = '';

beforeAll(() => {
  setLocalState('search', anotherStr);
});

afterEach(() => {
  vi.clearAllMocks();
});

test('testing Search component', async () => {
  const { getByPlaceholderText, getByText, getByAltText } = render(
    <Search updateSearch={mockUpdateSearch} />
  );

  const searchImput: HTMLElement = getByPlaceholderText(/search/i);
  const searchBtn: HTMLElement = getByAltText(/search/i);

  expect(searchImput).toBeInTheDocument();
  expect(getLocalState('search')).toBe(anotherStr);
  expect(searchImput).toHaveValue(anotherStr);
  expect(searchImput).toHaveClass(style.search);

  await act(async () => await userEvent.type(searchImput, `${testStr}{enter}`));
  expect(searchImput).toHaveValue(`${anotherStr}${testStr}`);
  expect(mockUpdateSearch).toHaveBeenCalledTimes(1);
  expect(mockUpdateSearch).toHaveBeenCalledWith(`${anotherStr}${testStr}`);
  expect(getLocalState('search')).toBe(`${anotherStr}${testStr}`);

  await act(async () => {
    await userEvent.type(searchImput, anotherStr);
  });

  expect(searchImput).toHaveValue(`${anotherStr}${testStr}${anotherStr}`);
  const cancelBtn: HTMLElement = getByText(/X/i);

  expect(cancelBtn).toBeDefined();
  await act(async () => await cancelBtn.click());

  expect(mockUpdateSearch).toHaveBeenCalledTimes(2);
  expect(mockUpdateSearch).toHaveBeenCalledWith(emptyStr);
  expect(searchImput).toHaveValue(emptyStr);
  expect(getLocalState('search')).toBe(emptyStr);

  expect(searchBtn).toBeDefined();
  await act(async () => await userEvent.type(searchImput, anotherStr));
  await act(async () => await searchBtn.click());
  expect(mockUpdateSearch).toHaveBeenCalledTimes(3);
  expect(mockUpdateSearch).toHaveBeenCalledWith(anotherStr);
  expect(getLocalState('search')).toBe(anotherStr);

  await act(async () => await userEvent.type(searchImput, `${testStr}{enter}`));
  expect(mockUpdateSearch).toHaveBeenCalledTimes(4);
  expect(mockUpdateSearch).toHaveBeenCalledWith(`${anotherStr}${testStr}`);
  expect(searchImput).toHaveValue(`${anotherStr}${testStr}`);
  expect(getLocalState('search')).toBe(`${anotherStr}${testStr}`);
});
