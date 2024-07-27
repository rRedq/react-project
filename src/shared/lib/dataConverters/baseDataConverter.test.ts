import { BaseDataType } from 'shared/types';
import { resultPlanetsResponse, resultStarshipResponse } from '../__mock__';
import { baseDataConverter } from './baseDataConverter';

const expectedStarshipResult: BaseDataType = {
  count: 1,
  data: [
    {
      name: 'Millennium Falcon',
      url: 'https://swapi.dev/api/starships/10/',
      starship_class: 'Light freighter',
      length: '34.37',
      consumables: '2 months',
      cost_in_credits: '100000',
      manufacturer: 'Corellian Engineering Corporation',
    },
  ],
};

const expectedPlanetsResult: BaseDataType = {
  count: 1,
  data: [
    {
      name: 'Tatooine',
      url: 'https://swapi.dev/api/planets/1/',
      climate: 'arid',
      diameter: '10465',
      gravity: '1 standard',
      population: '200000',
      terrain: 'desert',
    },
  ],
};

describe('testing baseDataConverter', () => {
  it('testing starships response', () => {
    const result = baseDataConverter(resultStarshipResponse, 'starships');
    expect(result).toEqual(expectedStarshipResult);
  });
  it('testing planets response', () => {
    const result = baseDataConverter(resultPlanetsResponse, 'planets');
    expect(result).toEqual(expectedPlanetsResult);
  });
});
