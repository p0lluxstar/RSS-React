import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataUser: {
    name: '',
    age: '',
    email: '',
    password: '',
  },
};

const userDataReactHookFormSlice = createSlice({
  name: 'ReactHookFormSlice',
  initialState,
  reducers: {
    addUser(state, action) {
      return { ...state, dataUser: action.payload };
    },
  },
});

export const userDataReactHookFormAction = userDataReactHookFormSlice.actions;
export const userDataReactHookFormReducer = userDataReactHookFormSlice.reducer;
