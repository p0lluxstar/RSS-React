import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ICharacterCard } from '../types/interfaces';
import styles from '../styles/characterDetails/CharacterDetails.module.css';
import lightStyles from '../styles/characterDetails/LightCharacterDetails.module.css';
import darkStyles from '../styles/characterDetails/DarkCharacterDetails.module.css';

interface IProps {
  character: ICharacterCard;
  onClose: () => void;
}

export default function CharacterDetails({
  character,
  onClose,
}: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

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
