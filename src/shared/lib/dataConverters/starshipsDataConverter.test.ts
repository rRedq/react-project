import { StarshipsResponse } from 'shared/types';
import { starshipsDataConverter } from './starshipsDataConverter';

interface TestType extends StarshipsResponse {
  unexpected: string;
}

const testData: TestType = {
  name: 'Millennium Falcon',
  url: 'https://swapi.dev/api/starships/10/',
  starship_class: 'Light freighter',
  length: '34.37',
  consumables: '2 months',
  cost_in_credits: '100000',
  manufacturer: 'Corellian Engineering Corporation',
  unexpected: 'test',
};

const expectedResullt: StarshipsResponse = {
  name: 'Millennium Falcon',
  url: 'https://swapi.dev/api/starships/10/',
  starship_class: 'Light freighter',
  length: '34.37',
  consumables: '2 months',
  cost_in_credits: '100000',
  manufacturer: 'Corellian Engineering Corporation',
};

test('testing starshipsDataConverter', () => {
  const result = starshipsDataConverter([testData]);
  expect(result).toStrictEqual([expectedResullt]);
});
