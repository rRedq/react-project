import {
  CategoriesType,
  CombinedType,
  CommonResultResponse,
} from './ResponseTypes';

interface ErrorState {
  hasError: boolean;
}

interface BaseDataType {
  count?: number;
  data: CombinedType;
}

type SearchProps = {
  search?: string;
  category: CategoriesType;
  page?: string;
};

interface ItemType extends CommonResultResponse {
  id: string;
}

interface ItemsType {
  species: ItemType[];
  planets: ItemType[];
  starships: ItemType[];
}

export {
  type ErrorState,
  type BaseDataType,
  type SearchProps,
  type ItemsType,
  type ItemType,
};
