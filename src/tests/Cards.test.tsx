import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cards from '../components/Cards';

const mockDataFetch = {
  results: [
    { id: 1, name: 'Персонаж 1', image: 'url1' },
    { id: 2, name: 'Персонаж 2', image: 'url2' },
  ],
};

describe('Компонент Cards', () => {
  it('Тест - компонент Cards отображается в DOM', () => {
    const mockOnCardClick = async (): Promise<void> => {};
    render(<Cards dataFetch={mockDataFetch} onCardClick={mockOnCardClick} />);

    expect(screen.getAllByTestId('cards')).toBeTruthy();
  });
});
