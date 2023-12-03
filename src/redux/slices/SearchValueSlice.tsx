import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setValueSearchLocalStorage(state, actions) {
      localStorage.setItem('searchValue', actions.payload);
      return { ...state, value: actions.payload };
    },
  },
});

export const searchValueActions = searchValueSlice.actions;

export const searchValueReducer = searchValueSlice.reducer;
