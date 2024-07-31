import {
  CategoriesType,
  CombinedTypeDetails,
  StarshipsResponse,
} from 'shared/types';
import axios from 'axios';
import { vi } from 'vitest';
import { getDetailsData } from './getDetailsData';

vi.mock('axios');

const testData: StarshipsResponse = {
  name: 'Millennium Falcon',
  url: 'https://swapi.dev/api/starships/10/',
  starship_class: 'Light freighter',
  length: '34.37',
  consumables: '2 months',
  cost_in_credits: '100000',
  manufacturer: 'Corellian Engineering Corporation',
};

test('testing getDetailsData', async () => {
  const card = '12';
  const category: CategoriesType = 'starships';

  vi.mocked(axios.get).mockResolvedValue({
    data: testData,
    status: 200,
  });

  const result: CombinedTypeDetails = await getDetailsData({
    card,
    category,
  });

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(result).toStrictEqual(testData);
});
