import { describe, it, expect, vi } from 'vitest';
import { fetchCharactersAndDetails } from '@/utils/fetchData';
import { IDetailsCharacter } from '@/types/interfaces';

const mockCharacters = {
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

const mockDetailsCharacter: IDetailsCharacter = {
  id: 1,
  name: 'Персонаж 1',
  image: 'https://example.com/image1.jpg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  error: '',
};

// Мокаем глобальный fetch
global.fetch = vi.fn();

describe('getServerSideProps', () => {
  it('возвращает корректные props при получении персонажей и их описания', async () => {
    // Мокаем успешный ответ для запроса персонажей
    (global.fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => mockCharacters,
    });

    // Мокаем успешный ответ для запроса деталей персонажа
    (global.fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => mockDetailsCharacter,
    });

    const context = {
      query: { page: '1', details: '1' },
    };

    const { props } = await fetchCharactersAndDetails(context);

    expect(props.characters).toEqual(mockCharacters.results);
    expect(props.detailsCharacter).toEqual(mockDetailsCharacter);
  });
});
