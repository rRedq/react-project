import { CategoriesType, CombinedType } from './ResponseTypes';

interface AppState {
  data: CombinedType | null;
  isLoading: boolean;
  category: CategoriesType;
  search?: string;
}

interface ErrorState {
  hasError: boolean;
}

interface VoidType {}

export { type AppState, type ErrorState, type VoidType };
