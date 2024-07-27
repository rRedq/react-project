import {
  SpeciesResponse,
  BaseResponse,
  StarshipsResponse,
  PlanetsResponse,
} from 'shared/types';

const testItemSpaceResponse: SpeciesResponse = {
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
  average_lifespan: '120',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
};
const testItem2SpaceResponse: SpeciesResponse = {
  name: 'Droid',
  url: 'https://swapi.dev/api/s',
  average_lifespan: '14',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
};

const testItemStarshipResponse: StarshipsResponse = {
  name: 'Millennium Falcon',
  url: 'https://swapi.dev/api/starships/10/',
  starship_class: 'Light freighter',
  length: '34.37',
  consumables: '2 months',
  cost_in_credits: '100000',
  manufacturer: 'Corellian Engineering Corporation',
};

const testItemPlanetsResponse: PlanetsResponse = {
  name: 'Tatooine',
  url: 'https://swapi.dev/api/planets/1/',
  climate: 'arid',
  diameter: '10465',
  gravity: '1 standard',
  population: '200000',
  terrain: 'desert',
};

const testData: SpeciesResponse[] = new Array(5).fill(testItemSpaceResponse);

const resultStarshipResponse: BaseResponse = {
  count: 1,
  next: 'test',
  previous: null,
  results: [testItemStarshipResponse],
};

const resultPlanetsResponse: BaseResponse = {
  count: 1,
  next: 'test',
  previous: null,
  results: [testItemPlanetsResponse],
};

const resultWithFiveItems: BaseResponse = {
  count: 5,
  next: 'test',
  previous: null,
  results: testData,
};

const nullResult: BaseResponse = {
  count: 0,
  next: 'test',
  previous: null,
  results: [],
};

const resultWithOneItem: BaseResponse = {
  count: 0,
  next: 'test',
  previous: null,
  results: [testItemSpaceResponse],
};

const resultWithTwoItem: BaseResponse = {
  count: 0,
  next: 'test',
  previous: null,
  results: [testItem2SpaceResponse, testItemSpaceResponse],
};

export {
  nullResult,
  resultWithFiveItems,
  testItemSpaceResponse,
  resultWithOneItem,
  resultWithTwoItem,
  resultStarshipResponse,
  resultPlanetsResponse,
};
