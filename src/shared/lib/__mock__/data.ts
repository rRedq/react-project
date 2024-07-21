import { SpeciesResponse, BaseResponse } from 'shared/types';

const testItemSpaceResponse: SpeciesResponse = {
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
  average_lifespan: '120',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
};

const testData = [
  testItemSpaceResponse,
  testItemSpaceResponse,
  testItemSpaceResponse,
  testItemSpaceResponse,
  testItemSpaceResponse,
];

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

export {
  nullResult,
  resultWithFiveItems,
  testItemSpaceResponse,
  resultWithOneItem,
};
