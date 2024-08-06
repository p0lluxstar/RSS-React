import MainPage from '@/components/MainPage';
import { fetchCharactersAndDetails } from '@/utils/fetchData';
import { redirect } from 'next/navigation';

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

  if (Object.keys(searchParams).length === 0) {
    redirect('/?page=1');
  }

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
