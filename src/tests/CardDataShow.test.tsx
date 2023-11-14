import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataPokemonArr, getPokemon } from '../types/interfaces';
import Pokemons from '../components/Pokemons';

test('Test - CardDataShow', async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
  const data: getPokemon = await response.json();
  const item: DataPokemonArr = {
    dataPokemon: [
      {
        namePokemon: data.name,
        urlImg: data.sprites.other.dream_world.front_default,
        typePokemon: data.types[0].type.name,
        err: false,
      },
    ],
  };
  render(<Pokemons dataPokemon={item.dataPokemon} />);
  expect(screen.getByText('Name pokemon: pikachu')).toBeInTheDocument();
  expect(screen.getByText('Type pokemon: electric')).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
});
