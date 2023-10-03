import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useGetPostsBySlugQuery, useUpdateAnArticleMutation } from '../../api/api'
import ArticleForm from '../ArticleForm'
import Loading from '../Loading'
import Error from '../Error'

function EditArticle() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { data: postData, isLoading, isError, refetch } = useGetPostsBySlugQuery(slug)
  const [updatePost, updateResult] = useUpdateAnArticleMutation()
  const userData = useSelector((state) => state?.auth?.user)
  const localToken = localStorage.getItem('token')

  const handleArticleSubmit = (article) => {
    const payload = { token: localToken, slug, article }
    updatePost(payload)
  }

  useEffect(() => {
    if (postData?.isSuccess && userData?.username !== postData?.article.author.username) {
      navigate('/sign-in')
    }
    if (updateResult?.isSuccess) {
      refetch()
      navigate(`/articles/${slug}`)
    }
  }, [updateResult.isSuccess, navigate, refetch, userData?.username, postData?.article.author])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }
  return <ArticleForm initialData={postData.article} onSubmit={handleArticleSubmit} />
}

export default EditArticle
