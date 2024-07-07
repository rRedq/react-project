import {
  CombinedType,
  SpeciesResponse,
  StarshipsResponse,
  PlanetsResponse,
  BaseResponse,
  CategoriesType,
} from 'shared/types';
import { planetsDataConverter } from './planetsDataConverter';
import { speciesDataConverter } from './speciesDataConverter';
import { starshipsDataConverter } from './starshipsDataConverter';

export const baseDataConverter = (
  data: BaseResponse,
  category: CategoriesType
): CombinedType => {
  let formatedData: CombinedType;

  switch (category) {
    case 'species':
      formatedData = speciesDataConverter(data.results as SpeciesResponse[]);
      break;
    case 'starships':
      formatedData = starshipsDataConverter(
        data.results as StarshipsResponse[]
      );
      break;
    case 'planets':
      formatedData = planetsDataConverter(data.results as PlanetsResponse[]);
      break;
    default:
      formatedData = speciesDataConverter(data.results as SpeciesResponse[]);
  }

  return formatedData;
};
