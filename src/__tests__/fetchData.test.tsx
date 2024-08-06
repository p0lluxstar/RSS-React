import { describe, expect, it, vi } from 'vitest';
import { fetchCharactersAndDetails } from '@/utils/fetchData';
import { IDetailsCharacter } from '@/types/interfaces';

const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://example.com/image.jpg',
    error: '',
  },
];

const mockDetailsCharacter: IDetailsCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://example.com/image.jpg',
  error: '',
};

// Мокаем глобальный fetch
global.fetch = vi.fn();

describe('fetchCharactersAndDetails', () => {
  it('успешно получает данные персонажей по странице', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ results: mockCharacters }),
    });

    const { characters, detailsCharacter } =
      await fetchCharactersAndDetails('1');

    expect(characters).toEqual(mockCharacters);
    expect(detailsCharacter).toEqual({});
  });

  it('успешно получает данные персонажей по странице', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ results: mockCharacters }),
    });

    const { characters, detailsCharacter } = await fetchCharactersAndDetails(
      null,
      null,
      'Rick'
    );

    expect(characters).toEqual(mockCharacters);
    expect(detailsCharacter).toEqual({});
  });

  it('успешно получает данные персонажа по деталям', async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ results: mockCharacters }),
    });

    // Настраиваем мок fetch для получения деталей персонажа
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockDetailsCharacter),
    });

    const { characters, detailsCharacter } = await fetchCharactersAndDetails(
      '1',
      '1'
    );

    expect(characters).toEqual(mockCharacters);
    expect(detailsCharacter).toEqual(mockDetailsCharacter);
  });
});
