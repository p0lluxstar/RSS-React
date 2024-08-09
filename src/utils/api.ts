export const api = async ({
  request,
}): Promise<{
  characters: object[];
  detailsCharacter: object;
}> => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || '1';
  const name = url.searchParams.get('name');
  const details = url.searchParams.get('details');

  let fetchUrl = '';

  if (page) {
    fetchUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
  }

  if (name) {
    fetchUrl = `https://rickandmortyapi.com/api/character/?name=${name}`;
  }

  let characters = [];
  let detailsCharacter = {};

  try {
    const response = await fetch(fetchUrl);
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

  return { characters, detailsCharacter };
};
