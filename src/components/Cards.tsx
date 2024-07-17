import { useSelector } from 'react-redux';
import { IDataFetch } from '../types/interfaces';
import { RootState } from '../redux/store';
import styles from '../styles/cards/Cards.module.css';
import lightStyles from '../styles/cards/LightCards.module.css';
import darkStyles from '../styles/cards/DarkCards.module.css';

interface IProps {
  dataFetch: IDataFetch;
  onCardClick: (id: number) => Promise<void>;
}

export default function Cards({
  dataFetch,
  onCardClick,
}: IProps): JSX.Element | null {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;

  if (dataFetch.results.length === 0) {
    return null;
  }

  if (dataFetch.results[0].id === 0) {
    return <p className={styles.message}>There is no card with that name.</p>;
  }

  return (
    <div className={styles.cards} data-testid="cards">
      {dataFetch.results.map((result, index) => (
        <div
          className={`${styles.card} ${themeStyles.card}`}
          key={index}
          onClick={(): Promise<void> => onCardClick(result.id)}
        >
          <img src={result.image} alt={result.name}></img>
          <div className={styles.cardName}>
            <span>{result.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
