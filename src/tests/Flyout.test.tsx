import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import { selectedCardsReducer } from '../redux/slices/selectedCardsSlice';
import Flyout from '../components/Flyout';
import { ICharacterCard } from '../types/interfaces';

// Создание mock хранилища Redux
const createMockStore = (selectedCards: ICharacterCard[]): Store => {
  return configureStore({
    reducer: {
      selectedCardsSlice: selectedCardsReducer,
    },
    preloadedState: {
      selectedCardsSlice: { selectedCards },
    },
  });
};

describe('Компонент Flyout', () => {
  it('должен отображаться Flyout с выбранными элементами и проверка кнопки "Unselect all"', () => {
    const mockSelectedCards = [
      {
        id: 1,
        name: 'Персонаж 1',
        image: 'url1',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
      },
      {
        id: 2,
        name: 'Персонаж 2',
        image: 'url2',
        status: 'Dead',
        species: 'Alien',
        gender: 'Female',
      },
    ];

    // Создание mock хранилища Redux
    const store = createMockStore(mockSelectedCards);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    // Проверка наличия текста о количестве выбранных элементов
    expect(
      screen.getByText(`${mockSelectedCards.length} items selected`)
    ).toBeInTheDocument();

    // Проверка наличия ссылки для скачивания CSV
    expect(screen.getByText('Download')).toBeInTheDocument();

    // Проверка работы кнопки "Unselect all"
    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);
  });
});
