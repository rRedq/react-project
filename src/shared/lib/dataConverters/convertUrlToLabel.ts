import { CategoriesType } from 'shared/types';

export const convertUrlToLabel = (url: string): CategoriesType => {
  const firstParamIndex = 0;
  const lastParamIndex = 1;
  const validCategories: CategoriesType[] = ['planets', 'species', 'starships'];
  const splitedUrl: string[] = url.split('/');
  const lastElem: string = splitedUrl[splitedUrl.length - lastParamIndex];
  const resultWithExt: string = lastElem.split('?')[firstParamIndex];
  const resultWithoutExt: string = resultWithExt
    .split('.')
    [firstParamIndex].split('-')[firstParamIndex];

  const result: CategoriesType = validCategories.includes(
    resultWithoutExt as CategoriesType
  )
    ? (resultWithoutExt as CategoriesType)
    : 'species';

  return result;
};
