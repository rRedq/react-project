import { DEFAULT_URL } from '../../consts/urls';

import { BaseResponse } from '../../types';

export const getData = async (): Promise<BaseResponse> => {
  const result = await fetch(DEFAULT_URL, {
    method: 'GET',
  });

  if (!result.ok) {
    throw new Error('something went wrong during getting planets');
  }

  const data: BaseResponse = await result.json();

  return data;
};
