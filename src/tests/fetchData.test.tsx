import { test, expect, vi, describe } from 'vitest';
import { fetchData } from '../utils/fetchData';
import { IDataFetch } from '../types/interfaces';

// Мок для setIsLoading
const setIsLoading = vi.fn();

describe('Утилита fetchData', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('возвращает данные при успешной выборке', async () => {
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
});
