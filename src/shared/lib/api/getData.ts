import { DEFAULT_URL } from 'shared/consts';
import { BaseResponse, CategoriesType } from 'shared/types';

export const getData = async (
  search: string = '',
  category: CategoriesType
): Promise<BaseResponse> => {
  const searchUrl = search ? `?search=${search}` : '';
  const result = await fetch(`${DEFAULT_URL}${category}${searchUrl}`);

  if (!result.ok) {
    throw new Error('something went wrong during getting planets');
  }

  const data: BaseResponse = await result.json();

  return data;
};
