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

type ThemeType = 'light' | 'dark';

export {
  type ErrorState,
  type BaseDataType,
  type SearchProps,
  type ItemsType,
  type ItemType,
  type ThemeType,
};
