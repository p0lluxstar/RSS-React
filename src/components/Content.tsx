import styles from '../styles/Content.module.css';
import Cards from './Cards';
import Pagination from './Pagination';
import Flyout from './Flyout';
import { useRouter } from 'next/router';
import { MAX_PAGE_NUMBER } from '@/constants/components';
import NotFoundPage from '@/pages/404';
import { IDetailsCharacter } from '@/types/interfaces';

interface IProps {
  characters: IDetailsCharacter[];
  handleCardClick: (id: number) => Promise<void>;
}

export default function Content({
  characters,
  handleCardClick,
}: IProps): JSX.Element {
  const router = useRouter();
  const numPaginationFromUrl = Number(router.query.page);

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
      {numPaginationFromUrl <= MAX_PAGE_NUMBER && <Pagination />}
      <Flyout />
    </div>
  );
}
