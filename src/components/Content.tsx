import Pagination from './Pagination';
import Cards from './Cards';
import { IDetailsCharacter } from '../types/interfaces';
import styles from '../styles/Content.module.css';
import Flyout from './Flyout';
import { MAX_PAGE_NUMBER } from '../constants/components';
import NotFoundPage from './NotFoundPage';
import { useSearchParams } from '@remix-run/react';

interface IProps {
  characters: IDetailsCharacter[];
  handleCardClick: (id: number) => Promise<void>;
  handlePaginationClick: () => void;
}

export default function Content({
  characters,
  handleCardClick,
  handlePaginationClick,
}: IProps): JSX.Element {
  const [searchParams] = useSearchParams();
  const numPaginationFromUrl = Number(searchParams.get('page'));

  if (numPaginationFromUrl > MAX_PAGE_NUMBER) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  return (
    <div className={styles.content}>
      <Cards characters={characters} handleCardClick={handleCardClick} />
      {(numPaginationFromUrl > 0 || searchParams.size === 0) && (
        <Pagination handlePaginationClick={handlePaginationClick} />
      )}
      <Flyout />
    </div>
  );
}
