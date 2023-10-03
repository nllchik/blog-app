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
  const [updatePost, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateAnArticleMutation()
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
    if (updateSuccess) {
      refetch()
      navigate(`/articles/${slug}`)
    }
  }, [updateSuccess, navigate, refetch, userData?.username, postData?.article.author])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }
  return <ArticleForm initialData={postData.article} onSubmit={handleArticleSubmit} isLoading={updateLoading} />
}

export default EditArticle
