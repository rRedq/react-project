import axios from 'axios';
import { DEFAULT_URL } from 'shared/consts';
import { CategoriesType, CombinedTypeDetails } from 'shared/types';

type getDataType = {
  category: CategoriesType;
  card: string;
};

export const getDetailsData = async (
  props: getDataType
): Promise<CombinedTypeDetails> => {
  const { category, card } = props;

  const res = await axios.get<CombinedTypeDetails>(card, {
    baseURL: `${DEFAULT_URL}${category}`,
  });

  if (res.status !== 200) {
    throw new Error('something went wrong during getting data');
  }

  const data: CombinedTypeDetails = res.data;

  return data;
};
