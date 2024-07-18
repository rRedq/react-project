import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddPayloadType,
  ItemsSchema,
  RemovePayloadType,
} from '../types/itemsTypes';

const initialState: ItemsSchema = {
  items: { species: [], starships: [], planets: [] },
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state: ItemsSchema, { payload }: PayloadAction<AddPayloadType>) {
      const { category, item } = payload;
      state.items[category].push(item);
    },
    removeItem(
      state: ItemsSchema,
      { payload }: PayloadAction<RemovePayloadType>
    ) {
      const { category, id } = payload;
      const current = state.items[category];

      for (let i = 0; i < current.length; i++) {
        if (current[i].id === id) {
          current.splice(i, 1);
          break;
        }
      }
    },
    clearItems(state: ItemsSchema) {
      state.items = initialState.items;
    },
  },
});

export const { reducer: itemsReducer } = itemsSlice;

export const { addItem, removeItem, clearItems } = itemsSlice.actions;
