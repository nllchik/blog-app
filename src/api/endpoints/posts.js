const postsEndpoints = (builder) => ({
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
})

export default postsEndpoints
