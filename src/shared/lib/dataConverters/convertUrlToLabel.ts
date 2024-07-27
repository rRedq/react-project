import { DEFAULT_CATEGORY } from 'shared/consts';
import { CategoriesType } from 'shared/types';

export const convertUrlToLabel = (url: string): CategoriesType => {
  const firstParamIndex = 0;
  const lastParamIndex = 1;
  const validCategories: CategoriesType[] = ['planets', 'species', 'starships'];
  const splittedUrl: string[] = url.split('/');
  const lastElem: string = splittedUrl[splittedUrl.length - lastParamIndex];
  const resultWithExt: string = lastElem.split('?')[firstParamIndex];
  const resultWithoutExt: CategoriesType = resultWithExt
    .split('.')
    [firstParamIndex].split('-')[firstParamIndex] as CategoriesType;

  const result: CategoriesType = validCategories.includes(resultWithoutExt)
    ? resultWithoutExt
    : DEFAULT_CATEGORY;

  return result;
};
