import styles from '../styles/Content.module.css';
import Cards from './Cards';
import Pagination from './Pagination';
import Flyout from './Flyout';

interface IProps {
  characters: [];
  paginationClick: (pageNumber: number) => void;
  handleCardClick: (id: number) => Promise<void>;
  showPagination: boolean;
}

export default function Content({
  characters,
  paginationClick,
  handleCardClick,
  showPagination,
}: IProps): JSX.Element {
  return (
    <div className={styles.content}>
      <Cards characters={characters} handleCardClick={handleCardClick} />
      {showPagination && <Pagination paginationClick={paginationClick} />}
      <Flyout />
    </div>
  );
}
