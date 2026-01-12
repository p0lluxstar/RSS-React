import { configureStore } from '@reduxjs/toolkit';
import { dataFormsSliceReducer } from './slices/DataFormsSlice';
import countryReducer from './slices/СountriesSlice';

const store = configureStore({
  reducer: {
    dataForms: dataFormsSliceReducer,
    countriesSlice: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
