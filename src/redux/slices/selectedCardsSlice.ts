import { createSlice } from '@reduxjs/toolkit';
import { IDetailsCharacter } from '../../types/interfaces';

interface SelectedCardsState {
  selectedCards: IDetailsCharacter[];
}

const initialState: SelectedCardsState = {
  selectedCards: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCardSelection: (state, action) => {
      const character = action.payload;
      const index = state.selectedCards.findIndex(
        (card) => card.id === character.id
      );
      if (index >= 0) {
        state.selectedCards.splice(index, 1);
      } else {
        state.selectedCards.push(character);
      }
    },
    unselectAllCards: (state) => {
      state.selectedCards = [];
    },
  },
});

export const { toggleCardSelection, unselectAllCards } =
  selectedCardsSlice.actions;
export const selectedCardsReducer = selectedCardsSlice.reducer;
