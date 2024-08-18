import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from 'entities/Cards';

const rootReducer = combineReducers({
  cards: cardsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
