import { configureStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from './slices/selectedCardsSlice';

const store = configureStore({
  reducer: {
    // сгенерированный редьюсер в root reducer
    selectedCardsSlice: selectedCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
