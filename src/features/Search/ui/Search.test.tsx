import { Search } from './Search';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import style from './Search.module.scss';
import { BrowserRouter } from 'react-router-dom';
import { getLocalState } from 'shared/utils/localState/localState';

test('testing Search component', async () => {
  const { getByPlaceholderText, getByText, getByAltText } = render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );

  const searchImput: HTMLElement = getByPlaceholderText(/search/i);
  const searchBtn: HTMLElement = getByAltText(/search/i);

  const testStr = 'test';
  const anotherStr = 'cr';
  const emptyStr = '';
  const searchParam = '?search=';

  expect(searchImput).toBeInTheDocument();
  expect(searchImput).toBeEmptyDOMElement();
  expect(searchImput).toHaveClass(style.search);
  expect(searchImput).toHaveValue(emptyStr);
  expect(location.search).toBeFalsy();

  await act(async () => await userEvent.type(searchImput, `${testStr}{enter}`));

  expect(searchImput).toHaveValue(testStr);
  expect(getLocalState('search')).toBe(testStr);
  expect(location.search).toBe(`${searchParam}${testStr}`);

  await act(async () => {
    await userEvent.type(searchImput, anotherStr);
  });

  const cancelBtn: HTMLElement = getByText(/X/i);

  expect(cancelBtn).toBeDefined();
  await act(async () => await cancelBtn.click());
  expect(getLocalState('search')).toBe(emptyStr);
  expect(searchImput).toHaveValue(emptyStr);
  expect(location.search).toBe(emptyStr);

  expect(searchBtn).toBeDefined();
  await act(async () => await userEvent.type(searchImput, anotherStr));
  await act(async () => await searchBtn.click());
  expect(getLocalState('search')).toBe(anotherStr);
  expect(searchImput).toHaveValue(anotherStr);
  expect(location.search).toBe(`${searchParam}${anotherStr}`);

  await act(async () => await userEvent.type(searchImput, testStr));
  await act(async () => searchBtn.click());
  expect(getLocalState('search')).toBe(`${anotherStr}${testStr}`);
  expect(location.search).toBe(`${searchParam}${anotherStr}${testStr}`);
});
