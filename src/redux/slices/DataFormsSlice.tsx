import { createSlice } from '@reduxjs/toolkit';
import { DataForm } from '../../types/interfaces';

const initialState: DataForm[] = [];

const dataFormsSlice = createSlice({
  name: 'DataForms',
  initialState,
  reducers: {
    addUser(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
  },
});

export const dataFormsSliceAction = dataFormsSlice.actions;
export const dataFormsSliceReducer = dataFormsSlice.reducer;
