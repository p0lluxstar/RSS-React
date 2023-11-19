import { configureStore } from '@reduxjs/toolkit';
import { searchValueReducer } from './slices/SearchValueSlice';
import { quantityPokemoOnPageReducer } from './slices/QuantityItemsOnPageSlice';

const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    quantityPokemoOnPage: quantityPokemoOnPageReducer,
  },
});

export default store;
