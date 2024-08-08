import styles from '../styles/Pagination.module.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export default function Pagination(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState('');
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
        <NavLink to={`/?page=1`} key={1}>
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
        </NavLink>
      );

      buttons.push(
        <span className={styles.ellipsis} key="ellipsis">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <NavLink to={`/?page=${i}${details}`} key={i}>
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
        </NavLink>
      );
    }

    return buttons;
  };

  return <div className={styles.pagination}>{renderPageButtons()}</div>;
}
