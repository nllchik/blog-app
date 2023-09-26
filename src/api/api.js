import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'https://api.realworld.io/api'
// const API_URL = 'https://blog.kata.academy/api'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['post'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ offset = 0, limit = 20 }) => ({
        url: '/articles',
        params: { offset, limit },
      }),
    }),
    getPostsBySlug: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
  }),
})

export const { useGetPostsQuery, useGetPostsBySlugQuery, useLazyGetPostsQuery } = api
