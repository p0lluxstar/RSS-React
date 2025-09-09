import styles from '../styles/cards/Cards.module.css';
import lightStyles from '../styles/cards/LightCards.module.css';
import darkStyles from '../styles/cards/DarkCards.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { IDetailsCharacter, IStoreReducer } from '@/types/interfaces';
import { toggleCardSelection } from '@/redux/slices/selectedCardsSlice';

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

  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: IStoreReducer) => state.selectedCardsSlice.selectedCards
  );

  const handleCheckboxChange = (result: object): void => {
    dispatch(toggleCardSelection(result));
  };

  const isCardSelected = (id: number): boolean => {
    return selectedCards.some((card) => card.id === id);
  };

  if (characters.length === 0) {
    return <p className={styles.message}>There is no card with that name.</p>;
  }

  return (
    <div className={styles.cards} data-testid="cards">
      {characters.map((character) => (
        <div className={styles.cardWrapper} key={character.id}>
          <input
            className={styles.checkboxCard}
            type="checkbox"
            onChange={(): void => handleCheckboxChange(character)}
            checked={
              typeof character.id === 'number'
                ? isCardSelected(character.id)
                : false
            }
          />
          <div
            className={`${styles.card} ${themeStyles.card} ${
              typeof character.id === 'number' && isCardSelected(character.id)
                ? styles.checked
                : ''
            }`}
            onClick={(): Promise<void> =>
              typeof character.id === 'number'
                ? handleCardClick(character.id)
                : Promise.resolve()
            }
          >
            <Image
              src={character.image ?? '/default-image.png'}
              alt={character.name ?? 'Character image'}
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
