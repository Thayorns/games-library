import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/games?key=71c319a9886e4b2283f2eacd42d57b7d' }),
  endpoints: (builder) => ({
    getGames: builder.query({
    // количество игр на странице
      query: ({ page = 1, pageSize = 20 }) => `
        https://api.rawg.io/api/games?key=71c319a9886e4b2283f2eacd42d57b7d&page=${page}&page_size=${pageSize}
        `,
    }),
    // детали игры по id
    getGame: builder.query({
      query: (itemId) => `
        https://api.rawg.io/api/games/${itemId}?key=71c319a9886e4b2283f2eacd42d57b7d&
      `
    })
  }),
})
export const { useGetGamesQuery,useGetGameQuery } = apiSlice
