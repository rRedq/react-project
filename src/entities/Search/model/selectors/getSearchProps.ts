import { RootState } from 'app/providers/storeProvider';

export const getSearchProps = (state: RootState) => {
  return state.search;
};
