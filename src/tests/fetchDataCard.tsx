/* import { test, expect, vi, describe } from 'vitest';
import { fetchDataCard } from '../utils/fetchDataCard';
import { ICharacter } from '../types/interfaces';

describe('fetchDataCard', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('returns data when fetch is successful', async () => {
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

  test('returns null when fetch returns error status', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const url = 'https://rickandmortyapi.com/api/character/999';
    const data = await fetchDataCard(url);

    expect(data).toBeNull();
  });

  test('returns null when fetch throws an error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const url = 'https://rickandmortyapi.com/api/character/1';
    const data = await fetchDataCard(url);

    expect(data).toBeNull();
  });
});
 */
