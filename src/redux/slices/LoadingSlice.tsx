import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    isLoading(state, action: PayloadAction<boolean>) {
      state = action.payload;
      return state;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
