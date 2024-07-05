import { DEFAULT_URL } from '../../consts/urls';
import { BaseResponse } from '../../types';

export const getData = async (search?: string): Promise<BaseResponse> => {
  const searchUrl = search ? `?search=${search}` : '';
  const result = await fetch(`${DEFAULT_URL}${searchUrl}`);

  if (!result.ok) {
    throw new Error('something went wrong during getting planets');
  }

  const data: BaseResponse = await result.json();

  return data;
};
