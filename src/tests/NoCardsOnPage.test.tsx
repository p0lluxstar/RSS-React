import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataPokemonArr } from '../types/interfaces';
import Pokemons from '../components/Pokemons';

test('Test - NoCardsOnPage', () => {
  const item: DataPokemonArr = {
    dataPokemon: [{}],
  };
  render(<Pokemons dataPokemon={item.dataPokemon} />);
  expect(
    screen.getByText('There is no Pokimon with that name!')
  ).toBeInTheDocument();
});
