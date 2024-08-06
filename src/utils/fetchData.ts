import { IDataFetch, IDetailsCharacter } from '@/types/interfaces';

export const fetchCharactersAndDetails = async (context: {
  query: { page?: string; name?: string; details?: string };
}): Promise<{
  props: {
    characters: IDataFetch | [];
    detailsCharacter: IDetailsCharacter | object;
  };
}> => {
  const { page = '1', name, details } = context.query;
  let url = '';

  if (page) {
    url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  }

  if (name) {
    url = `https://rickandmortyapi.com/api/character/?name=${name}`;
  }

  let characters = [];
  let detailsCharacter = {};

  try {
    const response = await fetch(url);
    const dataCharacters = await response.json();

    if (!dataCharacters || !dataCharacters.results) {
      throw new Error('Invalid data structure');
    }

    characters = dataCharacters.results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  if (details) {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${details}`
      );
      const dataDetailsCharacter = await response.json();

      detailsCharacter = dataDetailsCharacter;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return {
    props: {
      characters,
      detailsCharacter,
    },
  };
};
