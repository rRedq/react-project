import { ItemsType } from 'shared/types';

export const getItemsLength = (items: ItemsType) => {
  return items.planets.length + items.species.length + items.starships.length;
};
