import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MainContent from '@/components/MainContent';
import { IDetailsCharacter } from '@/types/interfaces';
import { MOCK_CHARACTERS } from '@/constants/tests';
import { Provider } from 'react-redux';
import store from '@/redux/store';

type MockUseSearchParams = {
  get: (key: string) => string | null;
};

const mockHandleCardClick = vi.fn();
const mockHandleCloseDetails = vi.fn();
const mockDetailsCharacter: IDetailsCharacter = {
  id: 1,
  name: 'Test Character',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://example.com/image.jpg',
  error: '',
};

// Мокаем useSearchParams
vi.mock('next/navigation', () => ({
  useSearchParams: (): MockUseSearchParams => ({
    get: (key: string): string | null => {
      if (key === 'page') return '1';
      return null;
    },
  }),
}));

describe('Компонент MainContent', () => {
  it('рендерит компонент с правильной темой', () => {
    render(
      <Provider store={store}>
        <MainContent
          characters={MOCK_CHARACTERS.results}
          handleCardClick={mockHandleCardClick}
          detailsCharacter={mockDetailsCharacter}
          handleCloseDetails={mockHandleCloseDetails}
        />
      </Provider>
    );

    // Проверяем, что компонент MainContent рендерится
    expect(screen.getByTestId('mainContent')).toBeInTheDocument();

    // Проверяем, что детали персонажа отображаются
    expect(screen.getByText(mockDetailsCharacter.name)).toBeInTheDocument();

    // Проверяем, что компонент Content рендерится
    expect(screen.getByText('Персонаж 1')).toBeInTheDocument();
  });
});
