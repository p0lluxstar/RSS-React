import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterDetails from '../components/CharacterDetails';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://example.com/rick.png',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
};

describe('Компонент CharacterDetails', () => {
  it('Должен отображать детали персонажа, если данные передаются', () => {
    const mockOnClose = vi.fn();

    render(
      <CharacterDetails character={mockCharacter} onClose={mockOnClose} />
    );

    // Проверка наличия элементов в документе
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'https://example.com/rick.png'
    );
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
  });
});
