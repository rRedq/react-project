import { CategoriesType } from 'shared/types';

export const convertUrlToLabel = (url: string): CategoriesType => {
  const validCategories: CategoriesType[] = ['planets', 'species', 'starships'];
  const splitedUrl: string[] = url.split('/');
  const lastElem: string = splitedUrl[splitedUrl.length - 1];
  const resultWithExt: string = lastElem.split('?')[0];
  const resultWithoutExt: string = resultWithExt.split('.')[0].split('-')[0];

  const result: CategoriesType = validCategories.includes(
    resultWithoutExt as CategoriesType
  )
    ? (resultWithoutExt as CategoriesType)
    : 'species';

  return result;
};
