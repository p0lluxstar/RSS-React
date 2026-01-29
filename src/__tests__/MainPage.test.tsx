import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainPage from '../components/MainPage';
import { MOCK_CHARACTERS, MOCK_DETAILS_CHARACTER } from '../constants/tests';
import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';

type MockRouter = {
  replace: vi.Mock;
};

type MockSearchParams = {
  get: vi.Mock;
};

// Мокаем useRouter и useSearchParams, чтобы избежать реальных навигаций во время тестов
vi.mock('next/navigation', () => ({
  useRouter: (): MockRouter => ({
    replace: vi.fn(),
  }),
  useSearchParams: (): MockSearchParams => ({
    get: vi.fn(),
  }),
}));

describe('MainPage Component', () => {
  it('renders the component and displays the header', () => {
    render(
      <Provider store={store}>
        <MainPage
          characters={MOCK_CHARACTERS.results}
          detailsCharacter={MOCK_DETAILS_CHARACTER}
        />
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('mainContent')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('cards')).toBeInTheDocument();
    expect(screen.getByTestId('CharacterDetails')).toBeInTheDocument();
  });
});
