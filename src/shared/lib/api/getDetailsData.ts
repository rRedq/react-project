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
  const categoryUrl: CategoriesType = category || 'species';
  const result = await fetch(`${DEFAULT_URL}${categoryUrl}/${card}`);

  if (!result.ok) {
    throw new Error('something went wrong during getting data');
  }

  const data: CombinedTypeDetails = await result.json();

  return data;
};
