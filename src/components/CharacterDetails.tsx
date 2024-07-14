import styles from '../styles/CharacterDetails.module.css';

interface ICharacter {
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

interface IProps {
  character: ICharacter;
  onClose: () => void; // Добавляем свойство для функции закрытия
}

export default function CharacterDetails({
  character,
  onClose,
}: IProps): JSX.Element {
  return (
    <div className={styles.characterDetails} data-testid="CharacterDetails">
      <button onClick={onClose}>×</button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
}
