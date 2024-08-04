import {
  toggleCardSelection,
  unselectAllCards,
  selectedCardsReducer,
} from '../redux/slices/selectedCardsSlice';
import { IDetailsCharacter } from '@/types/interfaces';
import { describe, expect, it } from 'vitest';

describe('selectedCardsSlice', () => {
  const mockCharacter1: IDetailsCharacter = {
    id: 1,
    name: 'Character 1',
    image: 'https://example.com/image1.jpg',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    error: '',
  };

  const mockCharacter2: IDetailsCharacter = {
    id: 2,
    name: 'Character 2',
    image: 'https://example.com/image2.jpg',
    status: 'Dead',
    species: 'Alien',
    gender: 'Female',
    error: '',
  };

  it('должен добавить персонажа в selectedCards', () => {
    const initialState = { selectedCards: [] };

    const nextState = selectedCardsReducer(
      initialState,
      toggleCardSelection(mockCharacter1)
    );

    expect(nextState.selectedCards).toEqual([mockCharacter1]);
  });

  it('должен удалить персонажа из selectedCards, если он уже выбран', () => {
    const initialState = { selectedCards: [mockCharacter1] };

    const nextState = selectedCardsReducer(
      initialState,
      toggleCardSelection(mockCharacter1)
    );

    expect(nextState.selectedCards).toEqual([]);
  });

  it('должен добавить нового персонажа в selectedCards, если он еще не выбран', () => {
    const initialState = { selectedCards: [mockCharacter1] };

    const nextState = selectedCardsReducer(
      initialState,
      toggleCardSelection(mockCharacter2)
    );

    expect(nextState.selectedCards).toEqual([mockCharacter1, mockCharacter2]);
  });

  it('должен очистить все выбранные карточки при вызове unselectAllCards', () => {
    const initialState = { selectedCards: [mockCharacter1, mockCharacter2] };

    const nextState = selectedCardsReducer(initialState, unselectAllCards());

    expect(nextState.selectedCards).toEqual([]);
  });
});
