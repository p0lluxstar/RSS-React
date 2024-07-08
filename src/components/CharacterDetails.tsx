interface ICharacter {
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

interface IProps {
  character: ICharacter;
}

export default function CharacterDetails({ character }: IProps): JSX.Element {
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
}
