import { IDetailsCharacter } from '@/types/interfaces';

export const fetchCharactersAndDetails = async (): Promise<{
  characters: IDetailsCharacter[];
  detailsCharacter: IDetailsCharacter;
}> => {
  // Реализация функции получения данных
  const charactersResponse = await fetch(
    'https://rickandmortyapi.com/api/character/?page=1'
  );
  const detailsCharacterResponse = await fetch(
    'https://rickandmortyapi.com/api/character/1'
  );

  const characters = await charactersResponse.json();
  const detailsCharacter = await detailsCharacterResponse.json();

  return { characters, detailsCharacter };
};
