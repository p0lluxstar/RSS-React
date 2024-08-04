import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/pages/index';
import { IDetailsCharacter } from '@/types/interfaces';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import store from '@/redux/store';

// Моковые данные
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

describe('Home Component', () => {
  it('рендерит MainPage с персонажами и деталями персонажа', () => {
    // Мокаем useRouter
    const router = createRouter;

    // Рендерим компонент
    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <Home
            characters={mockCharacters}
            detailsCharacter={mockDetailsCharacter}
          />
        </Provider>
      </RouterContext.Provider>
    );

    // Проверяем, что компонент MainPage рендерится
    expect(screen.getByText('Персонаж 1')).toBeInTheDocument();
    expect(screen.getByText('Персонаж 2')).toBeInTheDocument();
  });
});
