import { createSlice } from '@reduxjs/toolkit';

interface ICharacter {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

interface SelectedCardsState {
  selectedIds: ICharacter[];
}

const initialState: SelectedCardsState = {
  selectedIds: [],
};

const selectedCardSlice = createSlice({
  name: 'selectedCard',
  initialState,
  reducers: {
    toggleCardSelection: (state, action) => {
      const character = action.payload;
      const index = state.selectedIds.findIndex(
        (card) => card.id === character.id
      );
      if (index >= 0) {
        state.selectedIds.splice(index, 1);
      } else {
        state.selectedIds.push(character);
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
