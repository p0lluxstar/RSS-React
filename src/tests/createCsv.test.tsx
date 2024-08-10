import { describe, it, expect } from 'vitest';
import { createCsv } from '../utils/createCsv';
import { IDetailsCharacter } from '../types/interfaces';

describe('Функция createCSV', () => {
  it('должна правильно форматировать данные в CSV строку', () => {
    // Данные для тестирования
    const items: IDetailsCharacter[] = [
      {
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://example.com/rick.png',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        error: '',
      },
      {
        id: 2,
        name: 'Morty Smith',
        image: 'https://example.com/morty.png',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        error: '',
      },
    ];

    // Ожидаемый результат
    const expectedCSVContentURI =
      'data:text/csv;charset=utf-8,id;image;name;status;species;gender%0A1;https://example.com/rick.png;Rick%20Sanchez;Alive;Human;Male%0A2;https://example.com/morty.png;Morty%20Smith;Alive;Human;Male';
    // Вызов тестируемой функции
    const csvContentURI = createCsv(items);

    // Проверка, что возвращаемое значение совпадает с ожидаемым
    expect(csvContentURI).toBe(expectedCSVContentURI);
  });
});
