import Pagination from './Pagination';
import Cards from './Cards';
import { IDataFetch } from '../types/interfaces';
import styles from '../styles/Content.module.css';
import Flyout from './Flyout';

interface IProps {
  showPagination: boolean;
  dataFetch: IDataFetch;
  handleCardClick: (id: number) => Promise<void>;
  error: object | undefined;
}

export default function Content({
  showPagination,
  dataFetch,
  handleCardClick,
  error,
}: IProps): JSX.Element {
  return (
    <div className={styles.content}>
      <Cards
        dataFetch={dataFetch}
        onCardClick={handleCardClick}
        error={error}
      />
      {showPagination && <Pagination />}
      <Flyout />
    </div>
  );
}
