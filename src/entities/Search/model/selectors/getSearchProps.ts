import { RootState } from 'core/providers/storeProvider';

export const getSearchProps = (state: RootState) => {
  return state.search;
};
