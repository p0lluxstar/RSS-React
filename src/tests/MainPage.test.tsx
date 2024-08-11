import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../components/MainPage';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { MOCK_CHARACTERS, MOCK_DETAILS_CHARACTER } from '../constants/tests';

describe('Компонент PageContainer', () => {
  it('должен отображать элемент с классом mainContent', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage
            characters={MOCK_CHARACTERS}
            detailsCharacter={MOCK_DETAILS_CHARACTER}
          />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что элемент с тестовым id "mainContent" существует в DOM
    expect(screen.getByTestId('mainContent')).toBeInTheDocument();
  });
});
