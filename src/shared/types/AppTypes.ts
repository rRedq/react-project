import { CategoriesType, RacesResponse } from './ResponseTypes';

interface AppProps {
  data: RacesResponse[] | null;
  isLoading: boolean;
  category: CategoriesType;
  search?: string;
}

export { type AppProps };
