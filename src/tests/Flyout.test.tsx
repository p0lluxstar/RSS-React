import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import { selectedCardsReducer } from '../redux/slices/selectedCardsSlice';
import Flyout from '../components/Flyout';
import { IDetailsCharacter } from '../types/interfaces';
import { MOCK_CHARACTERS } from '../constants/tests';

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

describe('Компонент Flyout', () => {
  it('должен отображаться Flyout с выбранными элементами и проверка кнопки "Unselect all"', () => {
    // Создание mock хранилища Redux
    const store = createMockStore(MOCK_CHARACTERS);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    // Проверка наличия текста о количестве выбранных элементов
    expect(
      screen.getByText(`${MOCK_CHARACTERS.length} items selected`)
    ).toBeInTheDocument();

    // Проверка наличия ссылки для скачивания CSV
    expect(screen.getByText('Download')).toBeInTheDocument();

    // Проверка работы кнопки "Unselect all"
    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);
  });
});
