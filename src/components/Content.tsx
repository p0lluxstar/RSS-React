import Pagination from './Pagination';
import Cards from './Cards';
import { IDetailsCharacter } from '../types/interfaces';
import styles from '../styles/Content.module.css';
import Flyout from './Flyout';

interface IProps {
  showPagination: boolean;
  characters: IDetailsCharacter[];
  handleCardClick: (id: number) => Promise<void>;
  handlePaginationClick: () => void;
}

export default function Content({
  showPagination,
  characters,
  handleCardClick,
  handlePaginationClick,
}: IProps): JSX.Element {
  return (
    <div className={styles.content}>
      <Cards characters={characters} onCardClick={handleCardClick} />
      {showPagination && (
        <Pagination handlePaginationClick={handlePaginationClick} />
      )}
      <Flyout />
    </div>
  );
}
