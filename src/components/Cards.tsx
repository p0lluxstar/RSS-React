import styles from '../styles/Cards.module.css';
import { IDataFetch } from '../types/interfaces';

interface IProps {
  dataFetch: IDataFetch;
}

export default function Cards({ dataFetch }: IProps): JSX.Element | null {
  if (dataFetch.results.length === 0) {
    return null;
  }

  if (dataFetch.results[0].name === '') {
    return <p className={styles.message}>There is no card with that name.</p>;
  }

  return (
    <div className={styles.cards}>
      {dataFetch.results.map((result, index) => (
        <div className={styles.card} key={index}>
          <img src={result.image} alt={result.name}></img>
          <div className={styles.cardName}>
            <span>{result.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
