import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/games?key=71c319a9886e4b2283f2eacd42d57b7d' }),
  endpoints: (builder) => ({
    getGames: builder.query({
      query: ({ page = 1, pageSize = 10 }) => `
        https://api.rawg.io/api/games?key=71c319a9886e4b2283f2eacd42d57b7d&page=${page}&page_size=${pageSize}
        `,
    }),
    getGame: builder.query({
      query: ({id}) => `
        https://api.rawg.io/api/games?key=71c319a9886e4b2283f2eacd42d57b7d&${id}
      `
    })
  }),
})
export const { useGetGamesQuery,useGetGameQuery } = apiSlice
