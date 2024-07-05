import { CategoriesType, CombinedType } from './ResponseTypes';

interface AppProps {
  data: CombinedType | null;
  isLoading: boolean;
  category: CategoriesType;
  search?: string;
}

export { type AppProps };
