import { describe, it, expect, vi } from 'vitest';
import { api } from '../utils/api';

// Мокируем глобальный fetch
global.fetch = vi.fn();

describe('api function', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('должна возвращать список персонажей, когда передается параметр page', async () => {
    const mockCharacters = { results: [{ id: 1, name: 'Rick' }] };

    // Мокируем fetch для запроса персонажей
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => mockCharacters,
    });

    const request = { url: 'https://example.com/?page=1' };
    const result = await api({ request });

    expect(result.characters).toEqual(mockCharacters.results);
    expect(result.detailsCharacter).toEqual({});
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1'
    );
  });

  it('должна возвращать список персонажей по имени, когда передается параметр name', async () => {
    const mockCharacters = { results: [{ id: 2, name: 'Morty' }] };

    // Мокируем fetch для запроса по имени
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => mockCharacters,
    });

    const request = { url: 'https://example.com/?name=Morty' };
    const result = await api({ request });

    expect(result.characters).toEqual(mockCharacters.results);
    expect(result.detailsCharacter).toEqual({});
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Morty'
    );
  });

  it('должна возвращать подробную информацию о персонаже, когда передается параметр details', async () => {
    const mockDetailsCharacter = { id: 3, name: 'Summer' };

    // Мокируем fetch для запроса подробной информации о персонаже
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    });
    (fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => mockDetailsCharacter,
    });

    const request = { url: 'https://example.com/?details=3' };
    const result = await api({ request });

    expect(result.characters).toEqual([]);
    expect(result.detailsCharacter).toEqual(mockDetailsCharacter);
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/3'
    );
  });

  it('должна обрабатывать ошибки и возвращать пустые массивы в случае ошибки', async () => {
    // Мокируем fetch, чтобы он выбросил ошибку
    (fetch as vi.Mock).mockRejectedValueOnce(new Error('Network error'));

    const request = { url: 'https://example.com/?page=1' };
    const result = await api({ request });

    expect(result.characters).toEqual([]);
    expect(result.detailsCharacter).toEqual({});
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1'
    );
  });
});
