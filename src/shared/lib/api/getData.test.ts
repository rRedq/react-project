import { getData } from './getData';
import { BaseDataType, BaseResponse, CategoriesType } from 'shared/types';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

const testData: BaseResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

test('testing getData', async () => {
  const search = 'test';
  const category: CategoriesType = 'starships';

  vi.mocked(axios.get).mockResolvedValue({
    data: testData,
    status: 200,
  });

  const result: BaseDataType = await getData({ search, category });
  const { data, count } = result;

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(data).toEqual([]);
  expect(count).toBe(0);
});
