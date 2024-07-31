import styles from '../styles/cards/Cards.module.css';
import lightStyles from '../styles/cards/LightCards.module.css';
import darkStyles from '../styles/cards/DarkCards.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Image from 'next/image';
import { IDetailsCharacter } from '@/types/interfaces';

interface IProps {
  characters: IDetailsCharacter[];
  handleCardClick: (id: number) => Promise<void>;
}

export default function Cards({
  characters,
  handleCardClick,
}: IProps): JSX.Element {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  return (
    <div className={styles.cards} data-testid="cards">
      {characters.map((character) => (
        <div className={styles.cardWrapper} key={character.id}>
          <input className={styles.checkboxCard} type="checkbox" />
          <div
            className={`${styles.card} ${themeStyles.card}`}
            onClick={(): Promise<void> => handleCardClick(character.id)}
          >
            <Image
              src={character.image}
              alt={character.name}
              width={200}
              height={200}
            />
            <div className={styles.cardName}>
              <span>{character.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
