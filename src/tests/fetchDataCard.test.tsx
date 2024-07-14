import { test, expect, vi, describe } from 'vitest';
import { fetchDataCard } from '../utils/fetchDataCard';
import { ICharacter } from '../types/interfaces';

describe('Утилита fetchDataCard', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('возвращает данные при успешной выборке', async () => {
    const mockData: ICharacter = {
      name: 'Rick',
      image: 'url',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const url = 'https://rickandmortyapi.com/api/character/1';
    const data = await fetchDataCard(url);

    expect(data).toEqual(mockData);
  });
});
