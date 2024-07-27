import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const TestComponent = (): JSX.Element => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  test('toggles theme from light to dark and back', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    const button = screen.getByText('Toggle Theme');

    // Проверяем начальное значение темы
    expect(themeElement).toHaveTextContent('light');

    // Кликаем по кнопке для смены темы
    fireEvent.click(button);

    // Проверяем измененное значение темы
    expect(themeElement).toHaveTextContent('dark');

    // Кликаем по кнопке снова для возврата к исходной теме
    fireEvent.click(button);

    // Проверяем измененное значение темы
    expect(themeElement).toHaveTextContent('light');
  });
});
