import { useNavigate, useSearchParams } from '@remix-run/react';
import { IDetailsCharacter } from '../types/interfaces';

interface IProps {
  characters: IDetailsCharacter[];
  detailsCharacter: IDetailsCharacter;
}

export default function GreenigRemix({
  characters,
  detailsCharacter,
}: IProps): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handleNextPage = (): void => {
    const nextPage = page + 1;
    searchParams.set('page', nextPage.toString());
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div>
      {characters.map((character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
        </div>
      ))}
      <button onClick={handleNextPage}>Next</button>
      <hr />
      <p>{detailsCharacter.name}</p>
    </div>
  );
}
