import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainPage from '@/components/MainPage';
import { IDetailsCharacter } from '@/types/interfaces';
import createRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import store from '@/redux/store';

// Моковые данные для тестирования
const mockCharacters: IDetailsCharacter[] = [
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
];

const mockDetailsCharacter: IDetailsCharacter = {
  id: 1,
  name: 'Персонаж 1',
  image: 'https://example.com/image1.jpg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  error: '',
};

describe('Компонент MainPage', () => {
  it('рендерит компоненты Header и Content', () => {
    const router = createRouter;

    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <MainPage
            characters={mockCharacters}
            detailsCharacter={mockDetailsCharacter}
          />
        </Provider>
      </RouterContext.Provider>
    );

    // Проверяем, что компонент Header рендерится
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Проверяем, что компонент Content рендерится
    expect(screen.getByTestId('mainContent')).toBeInTheDocument();
  });
});
