import {
  toggleCardSelection,
  selectedCardsReducer,
} from '../redux/slices/selectedCardsSlice';
import { describe, expect, it } from 'vitest';
import { MOCK_DETAILS_CHARACTER } from '@/constants/tests';

describe('selectedCardsSlice', () => {
  it('должен добавить персонажа в selectedCards', () => {
    const initialState = { selectedCards: [] };

    const nextState = selectedCardsReducer(
      initialState,
      toggleCardSelection(MOCK_DETAILS_CHARACTER)
    );

    expect(nextState.selectedCards).toEqual([MOCK_DETAILS_CHARACTER]);
  });

  it('должен удалить персонажа из selectedCards, если он уже выбран', () => {
    const initialState = { selectedCards: [MOCK_DETAILS_CHARACTER] };

    const nextState = selectedCardsReducer(
      initialState,
      toggleCardSelection(MOCK_DETAILS_CHARACTER)
    );

    expect(nextState.selectedCards).toEqual([]);
  });
});
