import styles from '../styles/Cards.module.css';
import { IDataFetch } from '../types/interfaces';

interface IProps {
  dataFetch: IDataFetch;
  onCardClick: (id: number) => void;
}

export default function Cards({
  dataFetch,
  onCardClick,
}: IProps): JSX.Element | null {
  if (dataFetch.results.length === 0) {
    return null;
  }

  if (dataFetch.results[0].id === 0) {
    return <p className={styles.message}>There is no card with that name.</p>;
  }

  return (
    <div className={styles.cards}>
      {dataFetch.results.map((result, index) => (
        <div
          className={styles.card}
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
