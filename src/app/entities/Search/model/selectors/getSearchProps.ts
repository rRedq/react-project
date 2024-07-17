import { RootState } from 'app/providers/routerProvider/storeProvider';

export const getSearchProps = (state: RootState) => {
  return state.search;
};
