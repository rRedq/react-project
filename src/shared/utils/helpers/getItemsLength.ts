import { CategoriesType, ItemsType } from 'shared/types';

export const getItemsLength = (items: ItemsType) => {
  const keys = Object.keys(items);
  let count = 0;
  keys.forEach((key) => (count += items[key as CategoriesType].length));

  return count;
};
