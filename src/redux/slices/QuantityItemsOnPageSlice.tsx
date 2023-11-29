import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const quantityItemsOnPageSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    defaultQuantityItemsOnPage(state, actions) {
      return { ...state, value: actions.payload };
    },
  },
});

export const quantityPokemoOnPageActions = quantityItemsOnPageSlice.actions;

export const quantityPokemoOnPageReducer = quantityItemsOnPageSlice.reducer;
