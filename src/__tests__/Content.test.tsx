import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Content from '../components/Content';
import { useRouter } from 'next/router';
import { IDetailsCharacter } from '../types/interfaces';
import { MAX_PAGE_NUMBER } from '@/constants/components';
import { Provider } from 'react-redux';
import store from '@/redux/store';

// Мокируем useRouter
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockDataFetch = {
  results: [
    {
      id: 1,
      name: 'Персонаж 1',
      image: 'https://example.com/image1.jpg',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      error: '',
    },
    {
      id: 2,
      name: 'Персонаж 2',
      image: 'https://example.com/image2.jpg',
      status: 'Dead',
      species: 'Alien',
      gender: 'Female',
      error: '',
    },
  ],
};

describe('Компонент Content', () => {
  it('рендерит компонент Content', () => {
    // Мокаем данные и функции
    const mockPaginationClick = vi.fn();
    const mockHandleCardClick = vi.fn();
    const mockUseRouter = useRouter as vi.Mock;

    // Мокаем возвращаемое значение useRouter
    mockUseRouter.mockReturnValue({ query: { page: '1' } });

    // Рендерим компонент
    render(
      <Provider store={store}>
        <Content
          characters={mockDataFetch.results}
          paginationClick={mockPaginationClick}
          handleCardClick={mockHandleCardClick}
        />
      </Provider>
    );

    // Проверяем, что компонент рендерится
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Персонаж 1')).toBeInTheDocument();
    expect(screen.getByText('Персонаж 2')).toBeInTheDocument();
  });

  it('рендерит NotFoundPage если номер страницы превышает MAX_PAGE_NUMBER', () => {
    const mockCharacters: IDetailsCharacter[] = [];
    const mockPaginationClick = vi.fn();
    const mockHandleCardClick = vi.fn();
    const mockUseRouter = useRouter as vi.Mock;

    // Мокаем возвращаемое значение useRouter
    mockUseRouter.mockReturnValue({
      query: { page: (MAX_PAGE_NUMBER + 1).toString() },
    });

    // Рендерим компонент
    render(
      <Provider store={store}>
        <Content
          characters={mockCharacters}
          paginationClick={mockPaginationClick}
          handleCardClick={mockHandleCardClick}
        />
      </Provider>
    );

    // Проверяем, что компонент NotFoundPage рендерится
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
