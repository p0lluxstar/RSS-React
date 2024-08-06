import MainPage from '@/components/MainPage';
import { fetchCharactersAndDetails } from '@/utils/fetchData';

// Определите тип для параметров запроса
interface Props {
  searchParams: {
    page?: string;
    name?: string;
    details?: string;
  };
}

export default async function Home({
  searchParams,
}: Props): Promise<JSX.Element> {
  const page = searchParams.page || '1';
  const name = searchParams.name;
  const details = searchParams.details;

  console.log('Page:', page);
  console.log('Name:', name);
  console.log('Details:', details);

  // Передайте параметры в функцию получения данных
  const { characters, detailsCharacter } = await fetchCharactersAndDetails(
    page,
    details,
    name
  );

  return (
    <>
      <MainPage characters={characters} detailsCharacter={detailsCharacter} />
    </>
  );
}
