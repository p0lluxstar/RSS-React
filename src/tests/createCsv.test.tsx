import { describe, it, expect } from 'vitest';
import { createCsv } from '../utils/createCsv';
import { MOCK_CHARACTERS } from '../constants/tests';

describe('Функция createCSV', () => {
  it('должна правильно форматировать данные в CSV строку', () => {
    const expectedCSVContentURI =
      'data:text/csv;charset=utf-8,id;image;name;status;species;gender%0A1;https://example.com/rick.png;Rick%20Sanchez;Alive;Human;Male%0A2;https://example.com/morty.png;Morty%20Smith;Alive;Human;Male';

    const csvContentURI = createCsv(MOCK_CHARACTERS);

    // Проверка, что возвращаемое значение совпадает с ожидаемым
    expect(csvContentURI).toBe(expectedCSVContentURI);
  });
});
