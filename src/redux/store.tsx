import { configureStore } from '@reduxjs/toolkit';
import { userDataUncontrolledFormReducer } from './slices/UserUncontrolledFormSlice';
import { userDataReactHookFormReducer } from './slices/ReactHookFormSlice';

const store = configureStore({
  reducer: {
    userDataUncontrolledForm: userDataUncontrolledFormReducer,
    userDataReactHookForm: userDataReactHookFormReducer,
  },
});

export default store;
