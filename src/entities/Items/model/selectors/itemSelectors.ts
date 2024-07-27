import { RootState } from 'core/providers/storeProvider';
import { CategoriesType } from 'shared/types';
import { OriginalItems } from '../types/itemsTypes';
import { createSelector } from 'reselect';

const getSelectedItems = (state: RootState) => {
  return state.items.items;
};

const getOriginalItemsId = createSelector(
  [(state: RootState) => state.items.items],
  (items) => {
    const keys: CategoriesType[] = ['species', 'planets', 'starships'];
    const result: OriginalItems = { planets: [], species: [], starships: [] };

    keys.forEach((key) => {
      const categoryItems = items[key];
      result[key] = categoryItems.map((item) => item.id);
    });

    return result;
  }
);

export { getSelectedItems, getOriginalItemsId };
