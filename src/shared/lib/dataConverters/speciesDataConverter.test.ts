import { SpeciesResponse } from 'shared/types';
import { speciesDataConverter } from './speciesDataConverter';

interface TestType extends SpeciesResponse {
  unexpected: string;
}

const testData: TestType = {
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
  average_lifespan: '120',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
  unexpected: 'test',
};

const expectedResullt: SpeciesResponse = {
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
  average_lifespan: '120',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  hair_colors: 'blonde, brown, black, red',
  language: 'Galactic Basic',
  skin_colors: 'caucasian, black, asian, hispanic',
};

test('testing speciesDataConverter', () => {
  const result = speciesDataConverter([testData]);
  expect(result).toStrictEqual([expectedResullt]);
});
