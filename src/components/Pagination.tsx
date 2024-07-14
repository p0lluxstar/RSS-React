import { useState } from 'react';
import { NavLink, NavLinkRenderProps, useParams } from 'react-router-dom';
import styles from '../styles/Pagination.module.css';

interface IProps {
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ onPageChange }: IProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPageButtons = (): JSX.Element[] => {
    const buttons = [];
    let value;

    // получаем номер страницы из url
    if (params.numPagination) {
      value = params.numPagination.split('=')[1];
    }

    let startPage = Number(value) - 2;
    if (Number(value) > 2) {
      startPage = Number(value) - 2;
    } else {
      startPage = Math.max(1, currentPage - 2);
    }
    const endPage = Math.min(startPage + 4, 42); // Максимальная кнопка пагинации 42

    if (endPage - startPage < 4) {
      // Если не хватает кнопок, чтобы добить до 5, сдвигаем начало диапазона
      startPage = Math.max(1, endPage - 4);
    }

    // Добавляем кнопку для первой страницы, если текущая страница больше третьей
    if (startPage > 1) {
      buttons.push(
        <NavLink
          to={`/page=1`}
          key={1}
          onClick={(): void => handlePageChange(1)}
          data-testid={`page-button-1`}
          className={({ isActive }: NavLinkRenderProps): string =>
            isActive
              ? `${styles.paginationItem} ${styles.active}`
              : styles.paginationItem
          }
        >
          1
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
        <NavLink
          to={`/page=${i}`}
          key={i}
          onClick={(): void => handlePageChange(i)}
          data-testid={`page-button-${i}`}
          className={({ isActive }: NavLinkRenderProps): string =>
            isActive
              ? `${styles.paginationItem} ${styles.active}`
              : styles.paginationItem
          }
        >
          {i}
        </NavLink>
      );
    }

    return buttons;
  };

  return <div className={styles.pagination}>{renderPageButtons()}</div>;
}
