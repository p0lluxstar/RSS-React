import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/pages/index';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createRouter from 'next-router-mock';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { MOCK_CHARACTERS, MOCK_DETAILS_CHARACTER } from '@/constants/tests';

describe('Home Component', () => {
  it('рендерит MainPage с персонажами и деталями персонажа', () => {
    // Мокаем useRouter
    const router = createRouter;

    // Рендерим компонент
    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <Home
            characters={MOCK_CHARACTERS.results}
            detailsCharacter={MOCK_DETAILS_CHARACTER}
          />
        </Provider>
      </RouterContext.Provider>
    );

    // Проверяем, что компонент MainPage рендерится
    expect(screen.getByText('Персонаж 1')).toBeInTheDocument();
    expect(screen.getByText('Персонаж 2')).toBeInTheDocument();
  });
});
