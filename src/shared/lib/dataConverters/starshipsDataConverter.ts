import { StarshipsResponse } from 'shared/types';

export const starshipsDataConverter = (
  data: StarshipsResponse[]
): StarshipsResponse[] => {
  const result: StarshipsResponse[] = [];

  data.forEach((item) => {
    const {
      name,
      url,
      starship_class,
      length,
      consumables,
      cost_in_credits,
      manufacturer,
    } = item;

    result.push({
      name,
      url,
      starship_class,
      length,
      consumables,
      cost_in_credits,
      manufacturer,
    });
  });

  return result;
};
