import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from '../components/Pagination';
import { MemoryRouter } from 'react-router-dom';
import { useSearchParams } from '@remix-run/react';

vi.mock('@remix-run/react', () => ({
  useSearchParams: vi.fn(),
}));

describe('Компонент Pagination', () => {
  it('рендерит компонент с id pagination', () => {
    // Мокаем возвращаемое значение useSearchParams
    (useSearchParams as vi.Mock).mockReturnValue([new URLSearchParams()]);

    render(
      <MemoryRouter>
        <Pagination handlePaginationClick={vi.fn()} />
      </MemoryRouter>
    );

    // Проверяем, что элемент с data-testid="pagination" присутствует в документе
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
