import { CSV_URL } from 'shared/consts';
import { CategoriesType, ItemsType } from 'shared/types';

export const getItemsCsv = (items: ItemsType) => {
  const keys = Object.keys(items);
  let result: string = '';
  keys.forEach((key) => {
    if (items[key as CategoriesType].length > 0) result += `\n ${key} \n\n`;
    items[key as CategoriesType].forEach((item) => {
      const itemKeys = Object.keys(item);
      const itemValues = Object.values(item);
      result += `${itemKeys.join(',')} \n`;
      result += `${itemValues.join(',')} \n`;
    });
  });

  const csvContent = CSV_URL + result;
  return encodeURI(csvContent);
};
