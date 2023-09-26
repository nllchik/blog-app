/* eslint-disable prettier/prettier */
/* eslint-disable react/no-children-prop */
import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { parse, format } from 'date-fns'

import avatar from '../../assets/images/avatar.jpg'
import Loading from '../Loading'
import Error from '../Error'
import { useGetPostsBySlugQuery } from '../../api/api'

import classes from './PostDetails.module.scss'

function PostDetails() {
  const { slug } = useParams()
  const { data, isLoading, isError, error } = useGetPostsBySlugQuery(slug)

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

  const tags = post.tagList.map((tag) => (
    <div className={classes.info_tags} key={tag}>
      {tag}
    </div>
  ))

  const markDownBody = post.body.replace(/\\n/g, '<br/>')
  // const markDownBody = post.body.replace(/\\n/g, '\n')
  // const markDownBody = post.body

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
            <img className={classes.card__avatar} src={avatar} alt="Avatar" />
          </div>
        </div>
        <p className={classes.card__description}>{post.description}</p>
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
