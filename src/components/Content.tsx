import Cards from './Cards';
import Pagination from './Pagination';
import styles from '../styles/Content.module.css';

interface IProps {
  characters: [];
  paginationClick: (pageNumber: number) => void;
  handleCardClick: (id: number) => Promise<void>;
}

export default function Content({
  characters,
  paginationClick,
  handleCardClick,
}: IProps): JSX.Element {
  return (
    <div className={styles.content}>
      <Cards characters={characters} handleCardClick={handleCardClick} />
      <Pagination paginationClick={paginationClick} />
    </div>
  );
}
