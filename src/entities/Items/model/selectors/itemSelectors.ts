import { RootState } from 'app/providers/storeProvider';

export const getSelectedItems = (state: RootState) => {
  return state.items.items;
};
