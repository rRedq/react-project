import { SpeciesResponse } from 'shared/types';

export const speciesDataConverter = (
  data: SpeciesResponse[]
): SpeciesResponse[] => {
  const result: SpeciesResponse[] = [];

  data.forEach((item) => {
    const {
      name,
      url,
      average_lifespan,
      eye_colors,
      hair_colors,
      language,
      skin_colors,
    } = item;

    result.push({
      name,
      url,
      average_lifespan,
      eye_colors,
      hair_colors,
      language,
      skin_colors,
    });
  });

  return result;
};
