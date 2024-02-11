import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ limit = 5, start = 0 }) => ({
        url: '/posts',
        params: {
          _limit: limit,
          _start: start,
        },
      }),
    }),
    getPost: builder.query({
      query: (itemId) => `/posts/${itemId}`
    })
  }),
})
export const { useGetPostsQuery,useGetPostQuery } = apiSlice
