import { DEFAULT_URL } from 'shared/consts';
import { BaseResponse, CategoriesType, BaseDataType } from 'shared/types';
import { baseDataConverter } from '../dataConverters';

type getDataType = {
  search?: string | undefined;
  category?: CategoriesType;
  page?: string;
};

export const getData = async (props: getDataType): Promise<BaseDataType> => {
  const { search, category, page } = props;
  const propsUrl = page ? `/?page=${page}` : '';
  const searchUrl = search ? `?search=${search}` : '';
  const categoryUrl: CategoriesType = category || 'species';
  const result = await fetch(
    `${DEFAULT_URL}${categoryUrl}${searchUrl}${propsUrl}`
  );

  if (!result.ok) {
    throw new Error('something went wrong during getting data');
  }

  const data: BaseResponse = await result.json();

  return baseDataConverter(data, categoryUrl);
};
