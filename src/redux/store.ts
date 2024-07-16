import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { sliceApi } from './slices/sliceApi';

const store = configureStore({
  reducer: {
    // Добавьте сгенерированный редьюсер в root reducer
    [sliceApi.reducerPath]: sliceApi.reducer,
  },
  // Добавьте middleware для кэширования и управления запросами
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sliceApi.middleware),
});

setupListeners(store.dispatch);

export default store;
