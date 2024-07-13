import { DEFAULT_URL } from 'shared/consts';
import { BaseResponse, CategoriesType, BaseDataType } from 'shared/types';
import { baseDataConverter } from '../dataConverters';
import axios from 'axios';

type getDataType = {
  search?: string | undefined;
  category: CategoriesType;
  page?: string;
};

export const getData = async (props: getDataType): Promise<BaseDataType> => {
  const { search, category, page } = props;

  const res = await axios.get<BaseResponse>(`${DEFAULT_URL}${category}`, {
    params: {
      search,
      page,
    },
  });

  if (res.status !== 200) {
    throw new Error('something went wrong during getting data');
  }

  const data: BaseResponse = res.data;

  return baseDataConverter(data, category);
};
