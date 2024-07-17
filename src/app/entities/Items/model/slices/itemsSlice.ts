import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemSchema, PayloadType } from '../types/itemsTypes';

const initialState: ItemSchema = {
  items: { species: [], starships: [], planets: [] },
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state: ItemSchema, { payload }: PayloadAction<PayloadType>) {
      const { category, item } = payload;
      if (!state.items[category].includes(item)) {
        state.items[category].push(item);
      }
    },
    removeItem(state: ItemSchema, { payload }: PayloadAction<PayloadType>) {
      const { category, item } = payload;
      if (state.items[category].includes(item)) {
        const index = state.items[category].indexOf(item);
        state.items[category].splice(index, 1);
      }
    },
  },
});

export const { reducer: itemsReducer } = itemsSlice;

export const { addItem, removeItem } = itemsSlice.actions;
