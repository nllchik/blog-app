/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-children-prop */
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { parse, format } from 'date-fns'
import { useSelector } from 'react-redux'

import defaultAvatar from '../../assets/images/avatar.jpg'
import Loading from '../Loading'
import Error from '../Error'
import { useDeletePostMutation, useGetPostsBySlugQuery } from '../../api/api'

import classes from './PostDetails.module.scss'

function PostDetails() {
  const { slug } = useParams()
  const { data, isLoading, isError, error } = useGetPostsBySlugQuery(slug)
  const [deletePost, deleteResult] = useDeletePostMutation()
  const userData = useSelector((state) => state.auth.user)
  const localToken = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if(deleteResult.isSuccess){
      navigate('/articles')
    }
  },[deleteResult.isSuccess, navigate])

  const post = data?.article

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error error={error} />
  }

  if (!post) {
    return <p>Post Not Found</p>
  }

  const formattedDate = post.createdAt
    ? format(parse(post.createdAt, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSX', new Date()), 'MMMM d, yyyy')
    : 'Date unknown'

  const tags = post.tagList.filter((tag) => tag.trim()).map((tag) => (
    <div className={classes.info_tags} key={tag}>
      {tag}
    </div>
  ))
  
  const markDownBody = post.body

  const showController = post.author.username === userData?.username

  const handleDeleteButton = () => {
    const payload = { token: localToken, slug}
    deletePost(payload)
  }

  const handleEditButton = () => {
    navigate(`/articles/${slug}/edit`)
  }

  const userButtons = (
    <div className={classes.card_buttons}>
      <button className={classes.user_delete_button} onClick={handleDeleteButton} type='button'>Delete</button>
      <button className={classes.user_edit_button} onClick={handleEditButton} type='button'>Edit</button>
    </div>
  )

  return (
    <div className={classes.wrapper}>
      <div className={classes.card}>
        <div className={classes.card__content}>
          <div className={classes.card__info}>
            <div className={classes.info_header}>
              <h2 className={classes.info_title}>{post.title}</h2>
              <div className={classes.likesContainer}>
                <div>🤍</div>
                <div className={classes.info_likes_count}>{post.favoritesCount}</div>
              </div>
            </div>
            <div className={classes.info_tag_container}>{tags}</div>
          </div>
          <div className={classes.card__user}>
            <div className={classes.user_userInfo}>
              <div className={classes.user_userName}>{post.author.username}</div>
              <div className={classes.user_postDate}>{formattedDate}</div>
            </div>
            <img className={classes.card__avatar} src={post.author.image ? post.author.image : defaultAvatar} alt="Avatar" />
          </div>
        </div>
        <div className={classes.card__description_wrapper}>
          <div>
            <p className={classes.card__description}>{post.description}</p>
          </div>
          {showController ? userButtons : null}
        </div>
        <div className={classes.card__body}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {markDownBody}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
