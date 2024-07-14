import { test, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Компонент Header', () => {
  test('рендерит компонент Header', () => {
    const mockFetchSearchData = vi.fn();
    const mockOnInputChange = vi.fn();

    render(
      <Header
        fetchSearchData={mockFetchSearchData}
        onInputChange={mockOnInputChange}
        inputValue=""
      />
    );

    // Проверяем, что компонент рендерится
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter name card. Example: Rick')
    ).toBeInTheDocument();
  });

  test('вызывает onInputChange при изменении значения ввода', () => {
    const mockFetchSearchData = vi.fn();
    const mockOnInputChange = vi.fn();

    render(
      <Header
        fetchSearchData={mockFetchSearchData}
        onInputChange={mockOnInputChange}
        inputValue=""
      />
    );

    const input = screen.getByPlaceholderText('Enter name card. Example: Rick');
    fireEvent.change(input, { target: { value: 'Morty' } });

    // Проверяем, что функция onInputChange вызывается
    expect(mockOnInputChange).toHaveBeenCalledWith('Morty');
  });

  test('вызывает fetchSearchData при клике на кнопку Поиск', () => {
    const mockFetchSearchData = vi.fn();
    const mockOnInputChange = vi.fn();

    render(
      <Header
        fetchSearchData={mockFetchSearchData}
        onInputChange={mockOnInputChange}
        inputValue=""
      />
    );

    const button = screen.getByText('Search');
    fireEvent.click(button);

    // Проверяем, что функция fetchSearchData вызывается
    expect(mockFetchSearchData).toHaveBeenCalled();
  });

  test('вызывает fetchSearchData при нажатии клавиши Enter в поле ввода', () => {
    const mockFetchSearchData = vi.fn();
    const mockOnInputChange = vi.fn();

    render(
      <Header
        fetchSearchData={mockFetchSearchData}
        onInputChange={mockOnInputChange}
        inputValue=""
      />
    );

    const input = screen.getByPlaceholderText('Enter name card. Example: Rick');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Проверяем, что функция fetchSearchData вызывается
    expect(mockFetchSearchData).toHaveBeenCalled();
  });
});
