import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemsSchema, PayloadType } from '../types/itemsTypes';

const initialState: ItemsSchema = {
  items: { species: [], starships: [], planets: [] },
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state: ItemsSchema, { payload }: PayloadAction<PayloadType>) {
      const { category, item } = payload;
      if (!state.items[category].includes(item)) {
        state.items[category].push(item);
      }
    },
    removeItem(state: ItemsSchema, { payload }: PayloadAction<PayloadType>) {
      const { category, item } = payload;
      if (state.items[category].includes(item)) {
        const index = state.items[category].indexOf(item);
        state.items[category].splice(index, 1);
      }
    },
    clearItems(state: ItemsSchema) {
      state.items = initialState.items;
    },
  },
});

export const { reducer: itemsReducer } = itemsSlice;

export const { addItem, removeItem, clearItems } = itemsSlice.actions;
