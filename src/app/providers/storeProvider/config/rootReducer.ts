import { combineReducers } from '@reduxjs/toolkit';
import { itemsReducer } from 'app/entities/Items';
import { searchReducer } from 'app/entities/Search';
import { swapiReducer } from 'shared/lib/api';

export const rootReducer = combineReducers({
  swapi: swapiReducer,
  search: searchReducer,
  items: itemsReducer,
});
