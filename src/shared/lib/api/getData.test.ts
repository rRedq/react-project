import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { getData } from './getData';
import { BaseResponse, CategoriesType, CombinedType } from 'shared/types';
import { DEFAULT_URL } from 'shared/consts';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

const testData: BaseResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

test('testing getData', async () => {
  const search = 'test';
  const category: CategoriesType = 'starships';
  const expectedUrl = `${DEFAULT_URL}${category}?search=${search}`;

  fetchMock.mockResponseOnce(JSON.stringify(testData));

  const result: CombinedType = await getData(search, category);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(expectedUrl);
  expect(result).toEqual([]);
});
