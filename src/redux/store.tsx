import { configureStore } from '@reduxjs/toolkit';
import { searchValueReducer } from './slices/SearchValueSlice';
import { quantityPokemoOnPageReducer } from './slices/QuantityItemsOnPageSlice';
import { loadingReducer } from './slices/LoadingSlice';

const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    quantityPokemoOnPage: quantityPokemoOnPageReducer,
    loading: loadingReducer,
  },
});

export default store;
