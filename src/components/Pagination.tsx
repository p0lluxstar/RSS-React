import styles from '../styles/Pagination.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface IProps {
  handlePaginationClick: () => void;
}

export default function Pagination({
  handlePaginationClick,
}: IProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState('');
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const detailsParam = searchParams.get('details');

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }

    if (detailsParam) {
      setDetails(`&details=${detailsParam}`);
    } else {
      setDetails('');
    }
  }, [searchParams]);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    handlePaginationClick();
  };

  const renderPageButtons = (): JSX.Element[] => {
    const buttons = [];
    const pageValue = Number(searchParams.get('page')) || currentPage;

    let startPage = pageValue > 2 ? pageValue - 2 : 1;
    const endPage = Math.min(startPage + 4, 42); // Максимальная кнопка пагинации 42

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    if (startPage > 1) {
      buttons.push(
        <Link href={`/?page=1`} key={1}>
          <span
            onClick={(): void => handlePageChange(1)}
            data-testid={`page-button-1`}
            className={
              currentPage === 1
                ? `${styles.paginationItem} ${styles.active}`
                : styles.paginationItem
            }
          >
            1
          </span>
        </Link>
      );

      buttons.push(
        <span className={styles.ellipsis} key="ellipsis">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Link href={`/?page=${i}${details}`} key={i}>
          <span
            onClick={(): void => handlePageChange(i)}
            data-testid={`page-button-${i}`}
            className={
              currentPage === i
                ? `${styles.paginationItem} ${styles.active}`
                : styles.paginationItem
            }
          >
            {i}
          </span>
        </Link>
      );
    }

    return buttons;
  };

  return <div className={styles.pagination}>{renderPageButtons()}</div>;
}
