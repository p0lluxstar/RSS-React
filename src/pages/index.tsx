import { IDataFetch, IDetailsCharacter } from '@/types/interfaces';
import MainPage from '@/components/MainPage';

interface IProps {
  characters: [];
  detailsCharacter: IDetailsCharacter;
}

export default function Home({
  characters,
  detailsCharacter,
}: IProps): JSX.Element {
  return (
    <>
      <MainPage characters={characters} detailsCharacter={detailsCharacter} />
    </>
  );
}

export const getServerSideProps = async (context: {
  query: { page?: string; name?: string; details?: string };
}): Promise<{
  props: {
    characters: IDataFetch | [];
    detailsCharacter: IDetailsCharacter | [];
  };
}> => {
  const { page = '1', name, details } = context.query;
  let url = '';

  if (page && details) {
    url = `https://rickandmortyapi.com/api/character/?page=${page}&details=${details}`;
  }

  if (page) {
    url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  }

  if (name) {
    url = `https://rickandmortyapi.com/api/character/?name=${name}`;
  }

  try {
    const response = await fetch(url);
    const response2 = await fetch(
      `https://rickandmortyapi.com/api/character/${details}`
    );
    const data = await response.json();
    const data2 = await response2.json();

    if (!data || !data.results) {
      throw new Error('Invalid data structure');
    }

    return {
      props: {
        characters: data.results,
        detailsCharacter: data2,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        characters: [],
        detailsCharacter: [],
      },
    };
  }
};
