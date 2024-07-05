import { DEFAULT_URL } from 'shared/consts';
import { BaseResponse, CategoriesType, CombinedType } from 'shared/types';
import { baseDataConverter } from '../dataConverters';

export const getData = async (
  search: string | undefined,
  category: CategoriesType
): Promise<CombinedType> => {
  const searchUrl = search ? `?search=${search}` : '';
  const result = await fetch(`${DEFAULT_URL}${category}${searchUrl}`);

  if (!result.ok) {
    throw new Error('something went wrong during getting planets');
  }

  const data: BaseResponse = await result.json();

  return baseDataConverter(data, category);
};
