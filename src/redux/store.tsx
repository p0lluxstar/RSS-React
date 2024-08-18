import { configureStore } from '@reduxjs/toolkit';
import { dataFormsSliceReducer } from './slices/DataFormsSlice';
import countryReducer from './slices/СountriesSlice';

const store = configureStore({
  reducer: {
    dataForms: dataFormsSliceReducer,
    countries: countryReducer,
  },
});

export default store;
