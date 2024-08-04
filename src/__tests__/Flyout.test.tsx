import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store, configureStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from '../redux/slices/selectedCardsSlice';
import Flyout from '../components/Flyout';
import { IDetailsCharacter } from '../types/interfaces';
import { MOCK_CHARACTERS } from '@/constants/tests';

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
  it('должен рендерить Flyout с выбранными элементами и проверять кнопку "Unselect all"', () => {
    // Создание mock хранилища Redux
    const store = createMockStore(MOCK_CHARACTERS.results);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    // Проверка наличия текста о количестве выбранных элементов
    expect(
      screen.getByText(`${MOCK_CHARACTERS.results.length} items selected`)
    ).toBeInTheDocument();

    // Проверка наличия ссылки для скачивания CSV
    expect(screen.getByText('Download')).toBeInTheDocument();

    // Проверка работы кнопки "Unselect all"
    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);
  });
});
