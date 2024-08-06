import { fetchCharactersAndDetails } from '@/utils/fetchData';
import MainPage from '@/components/MainPage';

export default async function Home(): Promise<JSX.Element> {
  const { characters, detailsCharacter } = await fetchCharactersAndDetails();

  return (
    <>
      <MainPage characters={characters} detailsCharacter={detailsCharacter} />
    </>
  );
}
