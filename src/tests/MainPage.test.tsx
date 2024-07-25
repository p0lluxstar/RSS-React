import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../components/MainPage';
import store from '../redux/store';
import { Provider } from 'react-redux';

describe('Компонент PageContainer', () => {
  it('должен отображать элемент с классом mainContent', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что элемент с тестовым id "mainContent" существует в DOM
    expect(screen.getByTestId('mainContent')).toBeInTheDocument();
  });
});
