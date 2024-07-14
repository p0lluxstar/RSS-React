/* import { test, expect, vi, describe } from 'vitest';
import { fetchData } from '../utils/fetchData';
import { IDataFetch } from '../types/interfaces';

// Мок для setIsLoading
const setIsLoading = vi.fn();

describe('fetchData', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('returns data when fetch is successful', async () => {
    const mockData: IDataFetch = {
      results: [{ id: 1, name: 'Rick', image: 'url' }],
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const url = 'https://rickandmortyapi.com/api/character/?name=Rick';
    const data = await fetchData(setIsLoading, url);

    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(data).toEqual(mockData);
  });

  test('returns error data when fetch returns 404', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const url = 'https://rickandmortyapi.com/api/character/?name=Nonexistent';
    const data = await fetchData(setIsLoading, url);

    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(data).toEqual({ results: [{ id: 0, name: '', image: '' }] });
  });

  test('returns null when fetch fails with other error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const url = 'https://rickandmortyapi.com/api/character/?name=Error';
    const data = await fetchData(setIsLoading, url);

    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(data).toBeNull();
  });

  test('returns null when fetch throws an error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const url = 'https://rickandmortyapi.com/api/character/?name=Error';
    const data = await fetchData(setIsLoading, url);

    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(data).toBeNull();
  });
});
 */
