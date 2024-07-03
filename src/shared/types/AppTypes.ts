import { RacesResponse } from './ResponseTypes';

interface AppProps {
  data: RacesResponse[] | null;
  isLoading: boolean;
  updatePlanets?: (value: RacesResponse[] | null) => void;
}

export { type AppProps };
