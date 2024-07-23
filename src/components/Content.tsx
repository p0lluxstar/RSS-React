import Pagination from './Pagination';
import Cards from './Cards';
import { IDataFetch } from '../types/interfaces';
import styles from '../styles/Content.module.css';
import Flyout from './Flyout';

interface IProps {
  showPagination: boolean;
  dataFetch: IDataFetch;
  paginationClick: (pageNumber: number) => void;
  handleCardClick: (id: number) => Promise<void>;
}

export default function Content({
  showPagination,
  dataFetch,
  paginationClick,
  handleCardClick,
}: IProps): JSX.Element {
  return (
    <div className={styles.content}>
      <Cards dataFetch={dataFetch} onCardClick={handleCardClick} />
      {showPagination && <Pagination onPageChange={paginationClick} />}
      <Flyout />
    </div>
  );
}
