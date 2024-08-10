import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Content from '../components/Content';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useSearchParams } from '@remix-run/react';

// Мокаем useSearchParams
vi.mock('@remix-run/react', () => ({
  useSearchParams: vi.fn(),
}));

describe('Компонент Content', () => {
  /*  it('рендерит Cards и Pagination на действительной странице', () => {
    const mockHandleCardClick = vi.fn();
    const mockHandlePaginationClick = vi.fn();

    // Мокаем возвращаемое значение useSearchParams
    useSearchParams.mockReturnValue([{ get: () => '1', size: 0 }, vi.fn()]);

    render(
      <Provider store={store}>
        <Content
          characters={MOCK_CHARACTERS.results}
          handleCardClick={mockHandleCardClick}
          handlePaginationClick={mockHandlePaginationClick}
        />
      </Provider>
    );

    // Проверяем, что компоненты Cards и Pagination рендерятся
    expect(screen.getByTestId('cards')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  }); */

  it('рендерит NotFoundPage, если номер страницы превышает MAX_PAGE_NUMBER', () => {
    const mockHandleCardClick = vi.fn();
    const mockHandlePaginationClick = vi.fn();

    // Мокаем возвращаемое значение useSearchParams для недействительной страницы
    (useSearchParams as vi.Mock).mockReturnValue([
      { get: (): string => '999', size: 0 },
      vi.fn(),
    ]);

    render(
      <Provider store={store}>
        <Content
          characters={[]}
          handleCardClick={mockHandleCardClick}
          handlePaginationClick={mockHandlePaginationClick}
        />
      </Provider>
    );

    // Проверяем, что компонент NotFoundPage рендерится
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
