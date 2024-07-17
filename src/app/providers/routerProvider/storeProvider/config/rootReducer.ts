import { combineReducers } from '@reduxjs/toolkit';
import { searchReducer } from 'app/entities/Search';
import { swapiReducer } from 'shared/lib/api';

export const rootReducer = combineReducers({
  swapi: swapiReducer,
  search: searchReducer,
});
