import {
  CombinedType,
  SpeciesResponse,
  StarshipsResponse,
  PlanetsResponse,
  BaseResponse,
  CategoriesType,
  BaseDataType,
} from 'shared/types';
import { planetsDataConverter } from './planetsDataConverter';
import { speciesDataConverter } from './speciesDataConverter';
import { starshipsDataConverter } from './starshipsDataConverter';

export const baseDataConverter = (
  data: BaseResponse,
  category: CategoriesType
): BaseDataType => {
  let formattedData: CombinedType;

  switch (category) {
    case 'species':
      formattedData = speciesDataConverter(data.results as SpeciesResponse[]);
      break;
    case 'starships':
      formattedData = starshipsDataConverter(
        data.results as StarshipsResponse[]
      );
      break;
    case 'planets':
      formattedData = planetsDataConverter(data.results as PlanetsResponse[]);
      break;
  }

  const result: BaseDataType = { count: data.count || 0, data: formattedData };

  return result;
};
