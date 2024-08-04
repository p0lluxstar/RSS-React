import { IDetailsCharacter } from '../types/interfaces';

export const createCsv = (items: IDetailsCharacter[]): string => {
  const headers = ['id', 'image', 'name', 'status', 'species', 'gender'];

  const rows = items.map((item) => [
    item.id,
    item.image,
    item.name,
    item.status,
    item.species,
    item.gender,
  ]);

  const headerString = headers.join(';');

  const rowStrings = rows.map((row) => row.join(';'));

  const csvContentArray = [headerString, ...rowStrings];

  const csvContentString = csvContentArray.join('\n');

  const csvContentURI =
    'data:text/csv;charset=utf-8,' + encodeURI(csvContentString);

  return csvContentURI;
};
