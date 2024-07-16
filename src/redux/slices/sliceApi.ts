import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sliceApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character',
  }),
  endpoints: (builder) => ({
    getCardsByNumPageOrName: builder.query({
      query: (numPageOrName) => `${numPageOrName}`,
      keepUnusedDataFor: 1,
    }),
    getCardById: builder.query({
      query: (id) => `${id}`,
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetCardsByNumPageOrNameQuery, useGetCardByIdQuery } =
  sliceApi;
