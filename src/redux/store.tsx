import { configureStore } from '@reduxjs/toolkit';
import { searchValueReducer } from './slices/SearchValueSlice';
import { quantityPokemoOnPageReducer } from './slices/QuantityItemsOnPageSlice';
import { loadingReducer } from './slices/LoadingSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    searchValue: searchValueReducer,
    quantityPokemoOnPage: quantityPokemoOnPageReducer,
    loading: loadingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
