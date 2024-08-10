import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../components/MainPage';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { IDetailsCharacter } from '../types/interfaces';

const mockCharacters: IDetailsCharacter[] = [
  {
    id: 1,
    name: 'Character 1',
    image: 'https://example.com/image1.jpg',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    error: '',
  },
];

const mockDetailsCharacter: IDetailsCharacter = {
  id: 2,
  name: 'Character 2',
  image: 'https://example.com/image2.jpg',
  status: 'Alive',
  species: 'Alien',
  gender: 'Female',
  error: '',
};

describe('Компонент PageContainer', () => {
  it('должен отображать элемент с классом mainContent', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage
            characters={mockCharacters}
            detailsCharacter={mockDetailsCharacter}
          />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что элемент с тестовым id "mainContent" существует в DOM
    expect(screen.getByTestId('mainContent')).toBeInTheDocument();
  });
});
