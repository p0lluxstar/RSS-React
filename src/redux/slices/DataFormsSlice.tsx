import { createSlice } from '@reduxjs/toolkit';
import { IDataForm } from '../../types/interfaces';

const initialState: IDataForm[] = [];

const dataFormsSlice = createSlice({
  name: 'DataForms',
  initialState,
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const dataFormsSliceAction = dataFormsSlice.actions;
export const dataFormsSliceReducer = dataFormsSlice.reducer;
