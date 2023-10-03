const postsEndpoints = (builder) => ({
  getPosts: builder.query({
    query: ({ offset = 0, limit = 20 }) => ({
      url: '/articles',
      params: { offset, limit },
    }),
    providesTags: ['post'],
  }),
  getPostsBySlug: builder.query({
    query: (slug) => ({
      url: `/articles/${slug}`,
    }),
  }),
  createPost: builder.mutation({
    query: ({ token, post }) => ({
      url: '/articles',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: {
        article: {
          ...post,
        },
      },
    }),
    invalidatesTags: ['post'],
  }),
  deletePost: builder.mutation({
    query: ({ token, slug }) => ({
      url: `/articles/${slug}`,
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
    invalidatesTags: ['post'],
  }),
  updateAnArticle: builder.mutation({
    query: ({ token, slug, article }) => ({
      url: `/articles/${slug}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: {
        article: {
          ...article,
        },
      },
    }),
  }),
})

export default postsEndpoints
