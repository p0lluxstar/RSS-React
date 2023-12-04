import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataUser: {
    name: '',
    age: '',
    email: '',
    password: '',
  },
};

const userDataUncontrolledFormSlice = createSlice({
  name: 'UncontrolledForm',
  initialState,
  reducers: {
    addUser(state, action) {
      return { ...state, dataUser: action.payload };
    },
  },
});

export const userDataUncontrolledFormAction =
  userDataUncontrolledFormSlice.actions;
export const userDataUncontrolledFormReducer =
  userDataUncontrolledFormSlice.reducer;
