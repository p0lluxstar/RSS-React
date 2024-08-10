import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { selectedCardsReducer } from './slices/selectedCardsSlice';

const store = configureStore({
  reducer: {
    // сгенерированный редьюсер в root reducer
    selectedCardsSlice: selectedCardsReducer,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;
