import { combineReducers } from '@reduxjs/toolkit';
import { itemsReducer } from 'entities/Items';

export const rootReducer = combineReducers({
  items: itemsReducer,
});
