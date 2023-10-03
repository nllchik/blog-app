import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreatePostMutation } from '../../api/api'
import ArticleForm from '../ArticleForm'

export default function CreateArticle() {
  const [createPost, result] = useCreatePostMutation()
  const localToken = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (result.isSuccess) {
      navigate('/articles')
    }
  }, [result.isSuccess, navigate])

  const onSubmit = (data) => {
    const payload = { token: localToken, post: data }
    createPost(payload)
  }

  return <ArticleForm onSubmit={onSubmit} />
}
