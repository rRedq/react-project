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
  category?: CategoriesType;
  page?: string;
};

export { type ErrorState, type BaseDataType, type SearchProps };
