import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIds: [],
};

const selectedCardSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {
    toggleCardSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((cardId) => cardId !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    unselectAllCards: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleCardSelection, unselectAllCards } =
  selectedCardSlice.actions;
export const selectedCardReducer = selectedCardSlice.reducer;
