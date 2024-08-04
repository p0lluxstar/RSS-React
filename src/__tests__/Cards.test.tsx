import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cards from '../components/Cards';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { selectedCardsReducer } from '../redux/slices/selectedCardsSlice';
import { MOCK_CHARACTERS } from '@/constants/tests';

describe('Компонент Cards', () => {
  it('Компонент Cards отображается в DOM', () => {
    const mockOnCardClick = async (): Promise<void> => {};

    const store = configureStore({
      reducer: {
        selectedCardsSlice: selectedCardsReducer,
      },
    });

    render(
      <Provider store={store}>
        <Cards
          characters={MOCK_CHARACTERS.results}
          handleCardClick={mockOnCardClick}
        />
      </Provider>
    );

    expect(screen.getAllByTestId('cards')).toBeTruthy();
    /*  expect(asFragment()).toMatchSnapshot(); */
  });
});
