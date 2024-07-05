import { RacesResponse } from './ResponseTypes';

interface AppProps {
  data: RacesResponse[] | null;
  isLoading: boolean;
  updateValue?: (value: RacesResponse[] | null) => void;
}

export { type AppProps };
