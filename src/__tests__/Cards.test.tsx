import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cards from '../components/Cards';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { selectedCardsReducer } from '../redux/slices/selectedCardsSlice';

const mockDataFetch = {
  results: [
    {
      id: 1,
      name: 'Персонаж 1',
      image: 'https://example.com/image1.jpg',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      error: '',
    },
    {
      id: 2,
      name: 'Персонаж 2',
      image: 'https://example.com/image2.jpg',
      status: 'Dead',
      species: 'Alien',
      gender: 'Female',
      error: '',
    },
  ],
};

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
          characters={mockDataFetch.results}
          handleCardClick={mockOnCardClick}
        />
      </Provider>
    );

    expect(screen.getAllByTestId('cards')).toBeTruthy();
    /*  expect(asFragment()).toMatchSnapshot(); */
  });
});
