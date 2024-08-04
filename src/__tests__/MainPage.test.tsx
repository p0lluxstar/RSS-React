import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainPage from '@/components/MainPage';
import createRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { MOCK_CHARACTERS, MOCK_DETAILS_CHARACTER } from '@/constants/tests';

describe('Компонент MainPage', () => {
  it('рендерит компоненты Header и Content', () => {
    const router = createRouter;

    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <MainPage
            characters={MOCK_CHARACTERS.results}
            detailsCharacter={MOCK_DETAILS_CHARACTER}
          />
        </Provider>
      </RouterContext.Provider>
    );

    // Проверяем, что компонент Header рендерится
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Проверяем, что компонент Content рендерится
    expect(screen.getByTestId('mainContent')).toBeInTheDocument();
  });
});
