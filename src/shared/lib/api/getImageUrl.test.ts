import { getImageUrl } from './getImageUrl';

describe('testing getImageUrl', () => {
  it('testing species image', () => {
    const testUrl = 'https://swapi.dev/api/species/3/';
    const expectedUrl =
      'https://starwars-visualguide.com/assets/img/species/3.jpg';

    const result = getImageUrl(testUrl);
    expect(result).toBe(expectedUrl);
  });
  it('testing planets image', () => {
    const testUrl = 'https://swapi.dev/api/planets/21/';
    const expectedUrl =
      'https://starwars-visualguide.com/assets/img/planets/21.jpg';

    const result = getImageUrl(testUrl);
    expect(result).toBe(expectedUrl);
  });
  it('testing starships image', () => {
    const testUrl = 'https://swapi.dev/api/starships/13/';
    const expectedUrl =
      'https://starwars-visualguide.com/assets/img/starships/13.jpg';

    const result = getImageUrl(testUrl);
    expect(result).toBe(expectedUrl);
  });
});
