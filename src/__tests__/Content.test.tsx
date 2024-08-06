import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Content from '../components/Content';
import { IDetailsCharacter } from '../types/interfaces';
import { MAX_PAGE_NUMBER } from '@/constants/components';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { MOCK_CHARACTERS } from '@/constants/tests';
import { useSearchParams } from 'next/navigation';

// Мокируем useRouter
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

describe('Компонент Content', () => {
  it('рендерит компонент Content', () => {
    // Мокаем данные и функции
    const mockHandleCardClick = vi.fn();
    const mockUseSearchParams = useSearchParams as vi.Mock;

    // Мокаем возвращаемое значение useRouter
    mockUseSearchParams.mockReturnValue({
      get: () => '1', // Симулируем параметр страницы = 1
    });

    // Рендерим компонент
    render(
      <Provider store={store}>
        <Content
          characters={MOCK_CHARACTERS.results}
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
    const mockHandleCardClick = vi.fn();
    const mockUseSearchParams = useSearchParams as vi.Mock;

    // Мокаем возвращаемое значение useRouter
    mockUseSearchParams.mockReturnValue({
      get: () => (MAX_PAGE_NUMBER + 1).toString(), // Симулируем параметр страницы больше MAX_PAGE_NUMBER
    });

    // Рендерим компонент
    render(
      <Provider store={store}>
        <Content
          characters={mockCharacters}
          handleCardClick={mockHandleCardClick}
        />
      </Provider>
    );

    // Проверяем, что компонент NotFoundPage рендерится
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
