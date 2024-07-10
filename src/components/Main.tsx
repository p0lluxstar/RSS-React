import Cards from './Cards';
import { IDataFetch } from '../types/interfaces';
import styles from '../styles/Main.module.css';

interface IProps {
  dataFetch: IDataFetch;
  onCardClick: (id: number) => void;
}

export default function Main({ dataFetch, onCardClick }: IProps): JSX.Element {
  return (
    <div className={styles.main}>
      <Cards dataFetch={dataFetch} onCardClick={onCardClick} />
    </div>
  );
}
