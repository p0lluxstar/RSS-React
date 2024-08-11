import styles from '../styles/Pagination.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MAX_PAGE_NUMBER } from '@/constants/components';

export default function Pagination(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Получаем номер страницы из query параметров
    const { page, details } = router.query;

    if (details) {
      setDetails(`&details=${details}`);
    }

    if (page) {
      setCurrentPage(Number(page));
    }
  }, [router.query]);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const renderPageButtons = (): JSX.Element[] => {
    const buttons = [];
    const pageValue = Number(router.query.page) || currentPage;

    let startPage = pageValue > 2 ? pageValue - 2 : 1;
    const endPage = Math.min(startPage + 4, MAX_PAGE_NUMBER);

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
