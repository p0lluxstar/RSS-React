import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store, configureStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from '../redux/slices/selectedCardsSlice';
import Flyout from '../components/Flyout';
import { IDetailsCharacter } from '../types/interfaces';

// Создание mock хранилища Redux
const createMockStore = (selectedCards: IDetailsCharacter[]): Store => {
  return configureStore({
    reducer: {
      selectedCardsSlice: selectedCardsReducer,
    },
    preloadedState: {
      selectedCardsSlice: { selectedCards },
    },
  });
};

describe('Flyout Component', () => {
  it('should render Flyout with selected items and check "Unselect all" button', () => {
    const mockSelectedCards = [
      {
        id: 1,
        name: 'Character 1',
        image: 'url1',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        error: '',
      },
      {
        id: 2,
        name: 'Character 2',
        image: 'url2',
        status: 'Dead',
        species: 'Alien',
        gender: 'Female',
        error: '',
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
