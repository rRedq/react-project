import { DEFAULT_URL } from 'shared/consts';
import {
  CategoriesType,
  CombinedTypeDetails,
  PlanetsResponse,
  StarshipsResponse,
  SpeciesResponse,
  CombinedType,
} from 'shared/types';
import { planetsDataConverter } from '../dataConverters/planetsDataConverter';
import { starshipsDataConverter } from '../dataConverters/starshipsDataConverter';
import { speciesDataConverter } from '../dataConverters/speciesDataConverter';

type getDataType = {
  category: CategoriesType;
  card: string;
};

export const getDetailsData = async (
  props: getDataType
): Promise<CombinedType> => {
  const { category, card } = props;
  const categoryUrl: CategoriesType = category || 'species';
  const result = await fetch(`${DEFAULT_URL}${categoryUrl}/${card}`);

  if (!result.ok) {
    throw new Error('something went wrong during getting data');
  }

  const data: CombinedTypeDetails = await result.json();

  let formattedData: CombinedType;

  if (categoryUrl === 'planets') {
    formattedData = planetsDataConverter([data as PlanetsResponse]);
  } else if (categoryUrl === 'starships') {
    formattedData = starshipsDataConverter([data as StarshipsResponse]);
  } else {
    formattedData = speciesDataConverter([data as SpeciesResponse]);
  }

  return formattedData;
};
