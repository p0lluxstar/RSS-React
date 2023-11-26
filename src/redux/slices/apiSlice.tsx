import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => ({
    getOnePokemon: builder.query({
      query: (param) => param,
      keepUnusedDataFor: 1,
    }),
    getManyPokemons: builder.query({
      query: (numPagination) => `/?offset=${numPagination}&limit=20`,
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetOnePokemonQuery, useGetManyPokemonsQuery } = apiSlice;
