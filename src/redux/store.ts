import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './slices/apiSlice';
import { selectedCardsReducer } from './slices/selectedCardsSlice';

const store = configureStore({
  reducer: {
    // сгенерированный редьюсер в root reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedCardsSlice: selectedCardsReducer,
  },
  // middleware для кэширования и управления запросами
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;
