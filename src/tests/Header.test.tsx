import { test, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  test('renders the Header component', () => {
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

  test('calls onInputChange when input value changes', () => {
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

  test('calls fetchSearchData when Search button is clicked', () => {
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

  test('calls fetchSearchData when Enter key is pressed in input', () => {
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
