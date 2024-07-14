import { it, expect, describe, vi } from 'vitest'; // Добавьте 'vi' здесь
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

// Компонент, который выбрасывает ошибку при рендере
const ErrorComponent = (): never => {
  throw new Error('Test error');
};

describe('ErrorBoundary component', () => {
  it('should render error message when an error is caught', () => {
    // Используем console.error mock, чтобы подавить ошибку в консоли
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();

    // Восстанавливаем оригинальный console.error
    consoleErrorSpy.mockRestore();
  });
});
