import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailsCharacter from '@/components/DetailsCharacter';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  error: '',
};

describe('Компонент CharacterDetails', () => {
  it('Должен отображать детали персонажа, если данные передаются', () => {
    const mockOnClose = vi.fn();

    render(
      <DetailsCharacter
        detailsCharacter={mockCharacter}
        onClose={mockOnClose}
      />
    );

    // Проверка наличия элементов в документе
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Frickandmortyapi.com%2Fapi%2Fcharacter%2Favatar%2F1.jpeg&w=640&q=75'
    );
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
  });
});
