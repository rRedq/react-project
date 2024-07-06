import { CategoriesType, CombinedType } from './ResponseTypes';

interface AppState {
  data: CombinedType | null;
  isLoading: boolean;
  category: CategoriesType;
  search?: string;
}

export { type AppState };
