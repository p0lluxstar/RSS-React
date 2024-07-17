import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from '../styles/characterDetails/CharacterDetails.module.css';
import lightStyles from '../styles/characterDetails/LightCharacterDetails.module.css';
import darkStyles from '../styles/characterDetails/DarkCharacterDetails.module.css';

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
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;
  return (
    <div
      className={`${styles.characterDetails} ${themeStyles.characterDetails}`}
      data-testid="CharacterDetails"
    >
      <button onClick={onClose}>×</button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
}
