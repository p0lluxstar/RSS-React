import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Page from '../components/PageContainer';

describe('Компонент Pagination', () => {
  it('должен отображать кнопки пагинации и реагировать на нажатия', () => {
    render(
      <MemoryRouter initialEntries={['/page=1']}>
        <Page />
      </MemoryRouter>
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
