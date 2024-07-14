import { PlanetsResponse } from 'shared/types';
import { planetsDataConverter } from './planetsDataConverter';

interface TestType extends PlanetsResponse {
  unexpected: string;
}

const testData: TestType = {
  name: 'Tatooine',
  url: 'https://swapi.dev/api/planets/1/',
  climate: 'arid',
  diameter: '10465',
  gravity: '1 standard',
  population: '200000',
  terrain: 'desert',
  unexpected: 'test',
};

const expectedResullt: PlanetsResponse = {
  name: 'Tatooine',
  url: 'https://swapi.dev/api/planets/1/',
  climate: 'arid',
  diameter: '10465',
  gravity: '1 standard',
  population: '200000',
  terrain: 'desert',
};

test('testing planetsDataConverter', () => {
  const result = planetsDataConverter([testData]);
  expect(result).toStrictEqual([expectedResullt]);
});
