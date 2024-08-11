import { IDetailsCharacter } from '@/types/interfaces';
import MainPage from '@/components/MainPage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchCharactersAndDetails } from '@/utils/fetchData';
interface IProps {
  characters: IDetailsCharacter[];
  detailsCharacter: IDetailsCharacter;
}

export default function Home({
  characters,
  detailsCharacter,
}: IProps): JSX.Element {
  const router = useRouter();
  const currentUrl = router.asPath;

  useEffect(() => {
    if (currentUrl === '/') {
      router.push('/?page=1');
    }
  }, []);

  return (
    <>
      <MainPage characters={characters} detailsCharacter={detailsCharacter} />
    </>
  );
}

export const getServerSideProps = fetchCharactersAndDetails;
