import styles from '../styles/Content.module.css';
import Cards from './Cards';
import Pagination from './Pagination';
import Flyout from './Flyout';
import { useSearchParams } from 'next/navigation';
import { MAX_PAGE_NUMBER } from '@/constants/components';
import NotFoundPage from './NotFoundPage';
import { IDetailsCharacter } from '@/types/interfaces';

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
  const searchParams = useSearchParams();

  const numPaginationFromUrl = Number(searchParams.get('page'));

  if (numPaginationFromUrl > MAX_PAGE_NUMBER) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  return (
    <div className={styles.content} data-testid="content">
      <Cards characters={characters} handleCardClick={handleCardClick} />
      {numPaginationFromUrl > 0 && (
        <Pagination handlePaginationClick={handlePaginationClick} />
      )}
      <Flyout />
    </div>
  );
}
