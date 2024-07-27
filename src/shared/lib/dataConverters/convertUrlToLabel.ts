import { StaticImageData } from 'next/image';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { CategoriesType } from 'shared/types';

export const convertUrlToLabel = (
  url: string | StaticImageData
): CategoriesType => {
  let strUrl: string = '';
  if (typeof url === 'string') strUrl = url;
  else strUrl = url.src;

  const firstParamIndex = 0;
  const lastParamIndex = 1;
  const validCategories: CategoriesType[] = ['planets', 'species', 'starships'];
  const splittedUrl: string[] = strUrl.split('/');
  const lastElem: string = splittedUrl[splittedUrl.length - lastParamIndex];
  const resultWithExt: string = lastElem.split('?')[firstParamIndex];
  const resultWithoutExt: string = resultWithExt
    .split('.')
    [firstParamIndex].split('-')[firstParamIndex];

  const result: CategoriesType = validCategories.includes(
    resultWithoutExt as CategoriesType
  )
    ? (resultWithoutExt as CategoriesType)
    : DEFAULT_CATEGORY;

  return result;
};
