import styles from '../styles/Content.module.css';
import Cards from './Cards';
import Pagination from './Pagination';
import Flyout from './Flyout';
import { useSearchParams } from 'next/navigation';
import { MAX_PAGE_NUMBER } from '@/constants/components';
/* import NotFoundPage from '@/pages/404'; */
import { IDetailsCharacter } from '@/types/interfaces';

interface IProps {
  characters: IDetailsCharacter[];
  paginationClick: (pageNumber: number) => void;
  handleCardClick: (id: number) => Promise<void>;
}

export default function Content({
  characters,
  paginationClick,
  handleCardClick,
}: IProps): JSX.Element {
  const searchParams = useSearchParams();

  const numPaginationFromUrl = Number(searchParams.get('page'));

  if (numPaginationFromUrl > MAX_PAGE_NUMBER) {
    return (
      <>
        <p>NO PAGE</p>
      </>
    );
  }

  return (
    <div className={styles.content} data-testid="content">
      <Cards characters={characters} handleCardClick={handleCardClick} />
      {numPaginationFromUrl <= MAX_PAGE_NUMBER && (
        <Pagination paginationClick={paginationClick} />
      )}
      <Flyout />
    </div>
  );
}
