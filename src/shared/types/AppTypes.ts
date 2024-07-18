import { CategoriesType, CombinedType } from './ResponseTypes';

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

interface ItemsType {
  species: string[];
  planets: string[];
  starships: string[];
}

export { type ErrorState, type BaseDataType, type SearchProps, type ItemsType };
