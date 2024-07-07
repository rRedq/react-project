import { PlanetsResponse } from 'shared/types';

export const planetsDataConverter = (
  data: PlanetsResponse[]
): PlanetsResponse[] => {
  const result: PlanetsResponse[] = [];

  data.forEach((item) => {
    const { name, url, climate, diameter, gravity, population, terrain } = item;

    result.push({
      name,
      url,
      climate,
      diameter,
      gravity,
      population,
      terrain,
    });
  });

  return result;
};
