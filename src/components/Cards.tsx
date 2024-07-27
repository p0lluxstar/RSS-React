import { IDataFetch, IStoreReducer } from '../types/interfaces';
import styles from '../styles/cards/Cards.module.css';
import lightStyles from '../styles/cards/LightCards.module.css';
import darkStyles from '../styles/cards/DarkCards.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCardSelection } from '../redux/slices/selectedCardsSlice';

interface IProps {
  dataFetch: IDataFetch;
  onCardClick: (id: number) => Promise<void>;
  error: object | undefined;
}

export default function Cards({
  dataFetch,
  onCardClick,
  error,
}: IProps): JSX.Element | null {
  const themeContext = useContext(ThemeContext);
  const themeStyles = themeContext.theme === 'light' ? lightStyles : darkStyles;

  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: IStoreReducer) => state.selectedCardsSlice.selectedCards
  );

  if (error != undefined) {
    return <p className={styles.message}>There is no card with that name.</p>;
  }

  const handleCheckboxChange = (result: object): void => {
    dispatch(toggleCardSelection(result));
  };

  const isCardSelected = (id: number): boolean => {
    return selectedCards.some((card) => card.id === id);
  };

  return (
    <div className={styles.cards} data-testid="cards">
      {dataFetch.results.map((result) => (
        <div className={styles.cardWrapper} key={result.id}>
          <input
            className={styles.checkboxCard}
            type="checkbox"
            checked={isCardSelected(result.id)}
            onChange={(): void => handleCheckboxChange(result)}
          />
          <div
            className={`${styles.card} ${themeStyles.card} ${
              isCardSelected(result.id) ? styles.checked : ''
            }`}
            onClick={(): Promise<void> => onCardClick(result.id)}
          >
            <img src={result.image} alt={result.name}></img>
            <div className={styles.cardName}>
              <span>{result.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
