import styles from '../styles/Main.module.css';
import Cards from './Cards';
import { IDataFetch } from '../types/interfaces';

interface IProps {
  dataFetch: IDataFetch;
}

export default function Main(props: IProps): JSX.Element {
  return (
    <main className={styles.main}>
      <Cards dataFetch={props.dataFetch} />
    </main>
  );
}
