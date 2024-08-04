import { expect, describe, vi, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

describe('Компонент Header', () => {
  it('рендерит компонент Header', () => {
    const mockFetchSearchData = vi.fn();
    const mockOnInputChange = vi.fn();
    const mockOnClearInput = vi.fn();

    render(
      <Header
        fetchSearchData={mockFetchSearchData}
        onInputChange={mockOnInputChange}
        inputValue=""
        onClearInput={mockOnClearInput}
      />
    );

    // Проверяем, что компонент рендерится
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter name card. Example: Rick')
    ).toBeInTheDocument();

    // Проверяем, что функция onInputChange вызывается
    const input = screen.getByPlaceholderText('Enter name card. Example: Rick');
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('Morty');

    // Проверяем, что функция fetchSearchData вызывается
    const button = screen.getByText('Search');
    fireEvent.click(button);
    expect(mockFetchSearchData).toHaveBeenCalled();

    // Проверяем, что функция fetchSearchData вызывается
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockFetchSearchData).toHaveBeenCalled();

    // Проверяем, что функция onClearInput вызывается
    const clearButton = screen.getByRole('button', { name: /×/ });
    fireEvent.click(clearButton);
    expect(mockOnClearInput).toHaveBeenCalled();
  });
});
