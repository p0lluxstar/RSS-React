import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Pagination from '../components/Pagination';
import store from '../redux/store';
import { Provider } from 'react-redux';

describe('Компонент Pagination', () => {
  it('отображение многоточия, когда страниц много', () => {
    const mockOnPageChange = vi.fn();
    render(
      <MemoryRouter initialEntries={['/page=10']}>
        <Routes>
          <Route
            path=":numPagination"
            element={<Pagination onPageChange={mockOnPageChange} />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Проверяем, что компонент с текстом "..." отображается
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0); // проверяет, что хотя бы один элемент "..." отображается
  });

  it('должен отображать кнопки пагинации и реагировать на нажатия', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/page=1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    // Проверка отображения кнопок пагинации
    expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-2')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-4')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-5')).toBeInTheDocument();

    // Проверка нажатия кнопки пагинации
    const page2Button = screen.getByTestId('page-button-2');
    fireEvent.click(page2Button);
  });
});
