import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '1',
};

const numPaginationPageSlice = createSlice({
  name: 'numPaginationPage',
  initialState,
  reducers: {
    setNumPagenstionPageLocalStorage(state, actions) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('numPaginationPage', actions.payload);
      }
      return { ...state, value: actions.payload };
    },
  },
});

export const numPaginationPageActions = numPaginationPageSlice.actions;

export const numPaginationPageReducer = numPaginationPageSlice.reducer;
