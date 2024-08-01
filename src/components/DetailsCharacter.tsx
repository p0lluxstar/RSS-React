import styles from '../styles/detailsCharacter/DetailsCharacter.module.css';
import lightStyles from '../styles/detailsCharacter/LightDetailsCharacter.module.css';
import darkStyles from '../styles/detailsCharacter/DarkDetailsCharacter.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { IDetailsCharacter } from '../types/interfaces';
import Image from 'next/image';

interface IProps {
  detailsCharacter: IDetailsCharacter;
  onClose: () => void;
}

export default function DetailsCharacter({
  detailsCharacter,
  onClose,
}: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div
      className={`${styles.detailsCharacter} ${themeStyles.detailsCharacter}`}
      data-testid="CharacterDetails"
    >
      <button onClick={onClose}>×</button>
      <h2>{detailsCharacter.name}</h2>
      <Image
        src={detailsCharacter.image}
        alt={detailsCharacter.name}
        width={200}
        height={200}
      />
      <p>Status: {detailsCharacter.status}</p>
      <p>Species: {detailsCharacter.species}</p>
      <p>Gender: {detailsCharacter.gender}</p>
    </div>
  );
}
