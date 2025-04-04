import { configureStore } from '@reduxjs/toolkit';
import municipalitiesReducer from './municipalitiesSlice';

export const store = configureStore({
  reducer: {
    municipalities: municipalitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
