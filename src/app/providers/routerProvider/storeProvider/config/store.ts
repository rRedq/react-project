import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { swapi } from 'shared/lib/api/swApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
