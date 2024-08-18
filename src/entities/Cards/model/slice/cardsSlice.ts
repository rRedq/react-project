import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsSchema } from '../type/cards';
import { BaseDataType } from 'shared/types';
import { countries } from 'shared/const';

const initialState: CardsSchema = {
  cards: [],
  countries: countries,
  animate: false,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state: CardsSchema, { payload }: PayloadAction<BaseDataType>) {
      state.cards.push(payload);
      state.animate = true;
    },
    changeAnimateStatus(state: CardsSchema) {
      state.animate = false;
    },
  },
});

export const { reducer: cardsReducer } = cardsSlice;

export const { addCard, changeAnimateStatus } = cardsSlice.actions;
