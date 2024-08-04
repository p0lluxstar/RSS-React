import { describe, it, expect, vi } from 'vitest';
import { fetchCharactersAndDetails } from '@/utils/fetchData';
import { MOCK_CHARACTERS, MOCK_DETAILS_CHARACTER } from '@/constants/tests';

// Мокаем глобальный fetch
global.fetch = vi.fn();

describe('getServerSideProps', () => {
  it('возвращает корректные props при получении персонажей и их описания', async () => {
    // Мокаем успешный ответ для запроса персонажей
    (global.fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => MOCK_CHARACTERS,
    });

    // Мокаем успешный ответ для запроса деталей персонажа
    (global.fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => MOCK_DETAILS_CHARACTER,
    });

    const context = {
      query: { page: '1', details: '1' },
    };

    const { props } = await fetchCharactersAndDetails(context);

    expect(props.characters).toEqual(MOCK_CHARACTERS.results);
    expect(props.detailsCharacter).toEqual(MOCK_DETAILS_CHARACTER);
  });
});
