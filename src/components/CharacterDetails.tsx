import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { IDetailsCharacter } from '../types/interfaces';
import styles from '../styles/characterDetails/CharacterDetails.module.css';
import lightStyles from '../styles/characterDetails/LightCharacterDetails.module.css';
import darkStyles from '../styles/characterDetails/DarkCharacterDetails.module.css';

interface IProps {
  detailsCharacter: IDetailsCharacter;
  onClose: () => void;
}

const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export default function CharacterDetails({
  detailsCharacter,
  onClose,
}: IProps): JSX.Element | null {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  console.log('detailsCharacter', detailsCharacter);

  if (detailsCharacter.error === 'Character not found') {
    return (
      <div
        className={`${styles.characterDetails} ${themeStyles.characterDetails}`}
        data-testid="CharacterDetails"
      >
        <button onClick={onClose}>×</button>
        <p>There is no data on the character.</p>
      </div>
    );
  }

  if (isEmpty(detailsCharacter)) {
    return null;
  }

  return (
    <div
      className={`${styles.characterDetails} ${themeStyles.characterDetails}`}
      data-testid="CharacterDetails"
    >
      <button onClick={onClose}>×</button>
      <h2>{detailsCharacter.name}</h2>
      <img src={detailsCharacter.image} alt={detailsCharacter.name} />
      <p>Status: {detailsCharacter.status}</p>
      <p>Species: {detailsCharacter.species}</p>
      <p>Gender: {detailsCharacter.gender}</p>
    </div>
  );
}
