import React, { useState } from 'react';

interface IProps {
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({ onPageChange }: IProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPageButtons = (): JSX.Element[] => {
    const buttons = [];
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, 42); // Максимальная кнопка пагинации 42

    if (endPage - startPage < 4) {
      // Если не хватает кнопок, чтобы добить до 5, сдвигаем начало диапазона
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={(): void => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return <div>{renderPageButtons()}</div>;
}
